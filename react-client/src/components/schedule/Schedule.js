import React from 'react';
import DayComponent from './DayComponent';
import '../../css/schedule/Schedule.css';

const Schedule = ({ setShowSidebar, showSidebar, setIsHovered, days, scheduleStartDate }) => {
    const bgImage = `${process.env.PUBLIC_URL}/pexels-eberhardgross-1287145.jpg`;

    return (
        <div>
            <div style={{ position: 'relative' }}>
                <button className={`sidebar-toggle-btn ${showSidebar ? "closed" : ""}`}
                    onClick={() => setShowSidebar(!showSidebar)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    title="toggle sidebar"
                    style={{ marginLeft: '10px', marginTop: '10px', position: 'absolute' }}
                >
                    {showSidebar ? <span className="arrow-icon-left"></span> : <span className="arrow-icon-right"></span>}
                </button>
            </div>

            <div className={`days-wrapper ${showSidebar ? "" : "sidebar-closed-space"}`}>
                {days.map((day, index) => (
                    <DayComponent key={index} day={day} index={index} scheduleStartDate={scheduleStartDate} />
                ))}
            </div>
        </div>
    );
}

export default Schedule;
