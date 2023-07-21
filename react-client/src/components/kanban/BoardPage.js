import { useLocation } from "react-router"
import Board from "./Board";
import { useEffect, useState } from "react";
import KanbanService from "../../services/KanbanService";

const BoardPage = () => {
    const {state} = useLocation();
    const [board, setBoard] = useState(state);

    useEffect( () => {
        if(board == null) {
            const lastSlashIndex = window.location.href.lastIndexOf('/');
            const boardId = window.location.href.substring(lastSlashIndex + 1);
            KanbanService.getBoard(boardId).then(async (response) => {
                const responseBoard = await response.json();
                setBoard(responseBoard);
            });
        }
    }, [])

    return (
        <div>
            hi
            {board && <Board title={board.title} kanbanColumnsResponse={board.kanbanColumns} /> }
        </div>
    )
}

export default BoardPage;