import { useEffect, useState } from "react";
import KanbanService from "../services/KanbanService";
import { useNavigate } from "react-router";
import Header from "./Header";
import '../css/profile.css';
import AuthService from "../services/AuthService";
import TimelineService from "../services/TimelineService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
    const [boards, setBoards] = useState([]);
    const [timelines, setTimelines] = useState([]);
    const [boardTitle, setBoardTitle] = useState([]);
    const [isFormActive, setIsFormActive] = useState(false);
    const [isTimelineFormActive, setIsTimelineFormActive] = useState(false);
    const [timelineTitle, setTimelineTitle] = useState('');
    const navigate = useNavigate();
    const isLoggedIn = AuthService.isLoggedIn();
    const bgImage = `${process.env.PUBLIC_URL}/pexels-jplenio-1103970.jpg`;
    const buttonBgImage = `${process.env.PUBLIC_URL}/pexels-eberhardgross-1287145.jpg`;

    useEffect(() => {
        if (isLoggedIn) {
            KanbanService.fetchBoards().then(async (response) => {
                if (response.ok) {
                    const boardsResponse = await response.json();
                    setBoards(boardsResponse);
                }
            });

            TimelineService.fetchTimelines().then(async (response) => {
                if (response.ok) {
                    const timelinesResponse = await response.json();
                    setTimelines(timelinesResponse);
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

    function handleClickCreateTimeline() {
        isLoggedIn ? setIsTimelineFormActive(true) : navigate('/redirect');
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
            <div className="render-element-container">
                <div key={board.id} className="box" onClick={() => navigate('/board/' + board.id)}>
                    {board.title}
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header backgroundColor={"#f8f4e4"} />

            {/* <div id="welcome-username">
                Welcome {isLoggedIn && AuthService.generateUsername()}
            </div> */}
            <div className="profile-wrapper" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', zIndex: 999 }}>
                <div className="profile-container">
                    <div className="board-container">
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

                    <div className="schedule-container">
                        <button className="big-button" onClick={() => navigate('/schedule')}
                            style={{ backgroundImage: `url(${buttonBgImage})`, backgroundSize: 'cover', zIndex: 999}}>
                            Schedule GA <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: '10px'}} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

{/* <button className="long-button" onClick={handleCreateTimeline}> create timeline </button> */ }


export default Profile;