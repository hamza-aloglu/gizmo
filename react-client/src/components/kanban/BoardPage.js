import Board from "./Board";
import { useEffect, useState } from "react";
import KanbanService from "../../services/KanbanService";
import Header from "../Header";
import AuthService from "../../services/AuthService";
import '../../css/kanban/BoardPage.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Info from '../notification/Info';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";



const BoardPage = () => {
    const [boards, setBoards] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate();
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    let bgImage = `${process.env.PUBLIC_URL}/pexels-asadphoto-3293148.jpg`;
    let bgColor = "#1286b5";

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
                    setIsHovered={setIsHovered}
                />
            )
        }
    }

    const isNotificationVisible = notificationMessage ? "visible" : "hidden";
    const isErrorVisible = errorMessage ? "visible" : "hidden";

    return (
        <div className="boardPage-wrapper" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', zIndex: 999 }}>
            <Header backgroundColor={bgColor} />

            <div style={{ visibility: isNotificationVisible }}>
                <Info message={notificationMessage} backgroundColor={"#4CAF50"} />
            </div>
            <div style={{ visibility: isErrorVisible }}>
                <Info message={errorMessage} backgroundColor={"#e60b6e"} />
            </div>
            <div className={`sidebar ${showSidebar ? 'open' : ""}`} style={{ backgroundColor: bgColor }}>
                <div id="username-section">
                    <div>
                        <span> Workspace </span>
                        <h4>{AuthService.generateUsername()} </h4>
                    </div>

                    <button className="sidebar-toggle-btn"
                        onClick={() => setShowSidebar(!showSidebar)}
                        title="toggle sidebar"
                    >
                        <span className="arrow-icon-left"></span>
                    </button>
                </div>
                <div className="workspace-list">
                    <a href="/" className="board-link">
                        <img src="/kanban-3-32.png" alt="kanban-board-icon" width={30} className="board-img" />
                        <p className="board-text">Boards</p>
                    </a>
                    <Link to={{
                        pathname: "/schedule",
                    }} className="board-link">
                        <FontAwesomeIcon icon={faClock} color="black" width={30} height={46} />
                        <p className="board-text">Schedule Board</p>
                    </Link>
                </div>
                <div className="boards">
                    <div className="boards-title">
                        <h4> Your Boards </h4>
                    </div>
                    {boards && boards.map((board) =>
                        <a key={board.id} className="board-link" onClick={(e) => navigateToBoard(e, board.id)}>
                            <img src={`${bgImage}`} alt="board-img" className="board-img" height={32} width={32} />
                            <p className="board-text">{board.title}</p>
                        </a>
                    )}

                </div>
                <div id="delete-board-section">
                    <button onClick={deleteBoard} id="delete-board-button" > Delete Board </button>
                </div>
            </div>

            <div className={`sidebar-overlay ${!showSidebar ? 'open' : ""} ${isHovered ? 'highlight' : ""}`}
                style={{ backgroundColor: bgColor }}>
            </div>

            <div className={`${showSidebar ? 'sidebar-space' : ''}`}>
                {renderBoard()}
            </div>
        </div>

    )
}

export default BoardPage;