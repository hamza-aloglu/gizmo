import { useEffect, useState } from "react";
import KanbanService from "../services/KanbanService";
import { useNavigate } from "react-router";
import Header from "./Header";
import '../css/profile.css';
import AuthService from "../services/AuthService";

const Profile = () => {
    const [boards, setBoards] = useState([]);
    const [boardTitle, setBoardTitle] = useState([]);
    const [isFormActive, setIsFormActive] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = AuthService.isLoggedIn();

    useEffect(() => {
        if (isLoggedIn) {
            KanbanService.fetchBoards().then(async (response) => {
                if(response.ok) {
                    const boards = await response.json();
                    setBoards(boards);
                }
            });
        }
    }, [])


    function handleClickCreateBoard() {
        if (isLoggedIn) {
            setIsFormActive(true);
        }
        else {
            navigate('/redirect');
        }
    }

    function handleCreateBoard(e) {
        e.preventDefault();
        KanbanService.createBoard(boardTitle).then(async (response) => {
            const board = await response.json();
            navigate('/board/' + board.id);
        });
    }

    function renderBoard(board) {
        return (
            <div key={board.id} className="box" onClick={() => navigate('/board/' + board.id)}>
                {board.title}
            </div>
        )
    }

    return (
        <div>
            <Header />

            <div id="welcome-username">
                Welcome {isLoggedIn && AuthService.generateUsername()}
            </div>
            <div className="profile-wrapper">
                <div className="profile-container">
                    {boards && boards.map((board) => renderBoard(board))}

                    {
                        !isFormActive &&
                        <div className="box create-box" onClick={handleClickCreateBoard}>
                            Create Board
                        </div>
                    }
                    {
                        isFormActive &&
                        <form className="create-box" onSubmit={handleCreateBoard}>
                            <input className="long-button" type="text" onChange={(e) => setBoardTitle(e.target.value)}
                                autoFocus onBlur={() => setIsFormActive(false)} />
                        </form>
                    }
                </div>
            </div>



        </div>
    )
}

export default Profile;