import React from 'react';
import '../../css/schedule/Task.css';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

const Task = ({title}) => {
    return (
        <div className='task-container'>
            <p> {title} </p>
        </div>
    );
};

export default Task;