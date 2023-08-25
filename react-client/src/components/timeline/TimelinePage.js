import { useState } from "react";
import Header from "../Header";
import '../../css/timeline/TimelinePage.css';
import { VerticalTimeline } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import TimelineElement from "./TimelineElement";

const TimelinePage = ({ }) => {
    const [title, setTitle] = useState("default title ...");
    const [timelineElements, setTimelineElements] = useState([
        {
            "id": Math.random(),
            "title": "Title",
            "subtitle": "subtitle",
            "date": "2222-2-22",
            "description": "asdsadsad adjsoaşdjasodjaospd dsaodjoasşmoşsamd samdoşsamdosakmdoşsa dsadasdsa",
            "board": {
                "id": Math.random(),
                "title": "board title",
            },
        },
        {
            "id": Math.random(),
            "title": "Title",
            "subtitle": "subtitle",
            "date": "2222-2-22",
            "description": "asdsadsad adjsoaşdjasodjaospd dsaodjoasşmoşsamd samdoşsamdosakmdoşsa dsadasdsa",
            "board": {
                "id": Math.random(),
                "title": "board title",
            },
        },
    ]);

    function renderTimelineElement(tElement, index) {
        return (
            <TimelineElement key={tElement.id}
                id={tElement.id}
                onUpdate={(updatedElement) => handleUpdate(index, updatedElement)}

                title={tElement.title}
                subtitle={tElement.subtitle}
                date={tElement.date}
                description={tElement.description}
                board={tElement.board}
            />
        )
    }

    const handleUpdate = (index, updatedElement) => {
        const newElements = [...timelineElements];
        newElements[index] = updatedElement;
        setTimelineElements(newElements);
    };

    return (
        <div>
            <Header />
            <div className="timeline-title-section">
                {title}
            </div>

            <VerticalTimeline>
                {timelineElements && timelineElements.map((te, index) => renderTimelineElement(te, index))}
            </VerticalTimeline>

        </div>
    )
}

export default TimelinePage;