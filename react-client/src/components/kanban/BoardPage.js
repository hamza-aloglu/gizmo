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
    const [errorMessage, setErrorMessage] = useState(null);

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

    function deleteBoard() {
        KanbanService.deleteBoard(boardId).then(async (response) => {
            if (response.ok) {
                navigate("/");
            }
        });
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
                    setErrorMessage={setErrorMessage}
                />
            )
        }
    }

    const isNotificationVisible = notificationMessage ? "visible" : "hidden";
    const isErrorVisible = errorMessage ? "visible" : "hidden";

    return (
        <div className="boardPage-wrapper">
            <Header backgroundColor={"#69aed1"} />

            <div style={{ visibility: isNotificationVisible }}>
                <Info message={notificationMessage} backgroundColor={"#4CAF50"} />
            </div>
            <div style={{ visibility: isErrorVisible }}>
                <Info message={errorMessage} backgroundColor={"#e60b6e"} />
            </div>

            <div>
                <div className={`sidebar ${showSidebar ? 'open' : ""}`}>
                    <div id="delete-board-section">
                        <button onClick={deleteBoard} id="delete-board-button" > Delete board </button>
                    </div>
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