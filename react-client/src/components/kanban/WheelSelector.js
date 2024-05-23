import React, { useState } from 'react';
import '../../css/kanban/WheelSelector.css';

const WheelSelector = ({ numberOfCircles, circleWidth, circleHeight, update, initCircle }) => {
    // Component logic goes here
    let circles = [];
    const [selectedCircle, setSelectedCircle] = useState(initCircle - 1);

    for (let i = 0; i < numberOfCircles; i++) {
        const isSelected = i === selectedCircle;

        circles.push(
            <div key={i} className="circle"
                style={{
                    width: `${circleWidth}px`,
                    height: `${circleHeight}px`,
                    backgroundColor: isSelected ? 'yellow' : 'initial'
                }}
                onClick={() => update(i + 1, (i) => setSelectedCircle(i - 1))}>
                {i + 1}
            </div>
        );
    }

    return (
        <div className='circle-container'>
            {circles}
        </div>
    );
};

export default WheelSelector;