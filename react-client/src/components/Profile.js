import { useEffect, useState } from "react";
import KanbanService from "../services/KanbanService";
import { useNavigate } from "react-router";
import Header from "./Header";
import '../css/profile.css';
import AuthService from "../services/AuthService";
import TimelineService from "../services/TimelineService";

const Profile = () => {
    const [boards, setBoards] = useState([]);
    const [timelines, setTimelines] = useState([]);
    const [boardTitle, setBoardTitle] = useState([]);
    const [isFormActive, setIsFormActive] = useState(false);
    const [isTimelineFormActive, setIsTimelineFormActive] = useState(false);
    const [timelineTitle, setTimelineTitle] = useState('');
    const navigate = useNavigate();
    const isLoggedIn = AuthService.isLoggedIn();

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

    function handleCreateTimeline(e) {
        e.preventDefault();
        TimelineService.createTimeline(timelineTitle).then(async (response) => {
            if (response.ok) {
                const timeline = await response.json()
                navigate('/timeline/' + timeline.id);
            }
        })
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

    function renderTimeline(timeline) {
        return (
            <div className="render-element-container">
                <div key={timeline.id} className="box bg-purpleish" onClick={() => navigate('/timeline/' + timeline.id)}>
                    {timeline.title}
                </div>
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

                    <div className="timeline-container">
                        {timelines && timelines.map((t) => renderTimeline(t))}

                        {
                            !isTimelineFormActive &&
                            <div className="box create-box bg-purpleish" onClick={handleClickCreateTimeline}>
                                Create Timeline
                            </div>
                        }
                        {
                            isTimelineFormActive &&
                            <form className="create-box" onSubmit={handleCreateTimeline}>
                                <input className="long-button" type="text" onChange={(e) => setTimelineTitle(e.target.value)}
                                    autoFocus onBlur={() => setIsTimelineFormActive(false)} />
                            </form>
                        }


                    </div>

                </div>
            </div>
        </div>
    )
}

{/* <button className="long-button" onClick={handleCreateTimeline}> create timeline </button> */ }


export default Profile;