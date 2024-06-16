import React from 'react';
import Task from './Task';
import '../../css/schedule/DayComponent.css';



const DayComponent = ({ day, index, scheduleStartDate }) => {
    // Add your state initialization here
    console.log(day);
    const date = new Date(scheduleStartDate);
    date.setDate(date.getDate() + index);
    const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.toLocaleDateString('default', { weekday: 'long' })}`;

    return (
        <div className="column-container task-wrapper">
            <div className="day-header">
                {formattedDate}
            </div>
            {day.tasks && day.tasks.map((task, index) => {
                return <Task key={index} title={task.title} />
            })}
        </div>
    );
}

export default DayComponent;