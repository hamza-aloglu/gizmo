import { useEffect, useState } from "react";
import KanbanService from "../services/KanbanService";
import Board from "./kanban/Board";
import { useNavigate } from "react-router";

const Welcome = () => {
    const [boards, setBoards] = useState([]);
    const [title, setTitle] = useState([]);
    const [isFormActive, setIsFormActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        KanbanService.fetchBoards().then(async (response) => {
            const boards = await response.json();
            setBoards(boards);
        });
    }, [])

    function handleCreateBoard(e) {
        e.preventDefault();
        KanbanService.createBoard(title).then(async (response) => {
            const board = await response.json();
            navigate('/board/' + board.id, { state: board });
        });
    }

    return (
        <div>
            welcomepage
            {!isFormActive && <button onClick={() => setIsFormActive(true)}> Create Board </button>}
            {isFormActive && <form onSubmit={handleCreateBoard}>
                <input type="text" onChange={(e) => setTitle(e.target.value)} />
            </form> }
            
        </div>
    )
}

export default Welcome;