import Board from "./Board";
import { useEffect, useState } from "react";
import KanbanService from "../../services/KanbanService";
import Header from "../Header";
import AuthService from "../../services/AuthService";
import '../../css/kanban/BoardPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import Info from '../notification/Info';


const BoardPage = () => {
    const [boards, setBoards] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate();
    const [notificationMessage, setNotificationMessage] = useState(null);


    const { boardId } = useParams();

    useEffect(() => {
        KanbanService.fetchBoards().then(async (response) => {
            const responseBoards = await response.json();
            setBoards(responseBoards);
        })
    }, [boardId])

    function navigateToBoard(e, boardId) {
        navigate("/board/" + boardId);
    }

    const renderBoard = () => {
        const board = boards.find(b => b.id == boardId);

        if (board) {
            return (
                <Board key={board.id}
                    title={board.title}
                    kanbanColumnsResponse={board.kanbanColumns}
                    boardId={board.id}
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                    setNotificationMessage={setNotificationMessage}
                    />
            )
        }
    }

    const isNotificationVisible = notificationMessage ? "visible" : "hidden";

    return (
        <div>
            <Header />

            <div style={{ visibility: isNotificationVisible }}>
                <Info message={notificationMessage} />
            </div>

            <div>
                <div className={`sidebar ${showSidebar ? 'open' : ""}`}>
                    <div id="username-section">
                        <h2> {AuthService.generateUsername()} </h2>
                    </div>
                    <div className="boards">
                        <h3> Boards </h3>
                        {boards && boards.map((board) =>
                            <button key={board.id} className="board-button" onClick={(e) => navigateToBoard(e, board.id)}>
                                {board.title}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className={`${showSidebar ? 'sidebar-space' : ''}`}>
                {renderBoard()}
            </div>
        </div>

    )
}

export default BoardPage;