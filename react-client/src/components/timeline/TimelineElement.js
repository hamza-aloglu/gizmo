import { VerticalTimelineElement } from "react-vertical-timeline-component"
import '../../css/timeline/TimelineElement.css';
import { useState, useEffect, useRef } from "react";

const TimelineElement = ({ id, title, subtitle, date, description, board, onUpdate }) => {
    const [localTitle, setLocalTitle] = useState(title);
    const [localSubtitle, setLocalSubtitle] = useState(subtitle);
    const [localDate, setLocalDate] = useState(date);
    const [localDescription, setLocalDescription] = useState(description);
    const [localBoard, setLocalBoard] = useState(board);

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);
    const [isEditingDate, setIsEditingDate] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    const textareaRef = useRef(null);

    useEffect(() => {
        function adjustHeight() {
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
        }

        adjustHeight();
    }, [localDescription, isEditingDescription]);

    const timelineElementObj = {
        id,
        "title": localTitle,
        "subtitle": localSubtitle,
        "date": localDate,
        "description": localDescription,
        "board": localBoard,
        onUpdate,
    };

    function finishEditTitle() {
        setIsEditingTitle(false);
        // put request.
        onUpdate({ ...timelineElementObj });
    }

    function finishEditSubtitle() {
        setIsEditingSubtitle(false);
        // put request
        onUpdate({ ...timelineElementObj });
    }

    function finishEditDate() {
        setIsEditingDate(false);
        // put request
        onUpdate({ ...timelineElementObj });
    }

    function handleKeyDowns(event) {
        if ((event.ctrlKey || event.metaKey) && event.key === "s") {
            event.preventDefault();
            finishEditDescription();
        }
        if (event.key === 'Tab') {
            event.preventDefault();
            const start = event.target.selectionStart;
            const end = event.target.selectionEnd;
            const spaces = "    ";  // 4 spaces
            setLocalDescription(prevDescription => prevDescription.substring(0, start) + spaces + prevDescription.substring(end));
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = start + 4;
                    textareaRef.current.selectionEnd = start + 4;
                }
            }, 0);
        }
    }

    function finishEditDescription() {
        setIsEditingDescription(false);
        // put request
        onUpdate({ ...timelineElementObj });
    }

    function handleBoardSelect(e) {
        console.log(e.target.value);
        // send put request.
    }

    function renderDescriptionWithNewlines(description) {
        return description.split('\n').map((line, index) => {
            return (
                <span key={index}>
                    {line}
                    {index !== description.split('\n').length - 1 && <br />}
                </span>
            );
        });
    }

    return (
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: 'black' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date={isEditingDate ? (
                <input type="date" className="timeline-element-border" onChange={(e) => setLocalDate(e.target.value)}
                    value={localDate} onBlur={finishEditDate} onKeyDown={(e) => e.key === 'Enter' && finishEditDate()} autoFocus />
            ) : (
                <p onDoubleClick={() => setIsEditingDate(true)}> {localDate} </ p>
            )}
        >
            {isEditingTitle ? (
                <input type="text" className="timeline-element-border timeline-title-input" onChange={(e) => setLocalTitle(e.target.value)}
                    value={localTitle} onBlur={finishEditTitle} onKeyDown={(e) => e.key === 'Enter' && finishEditTitle()} autoFocus />
            ) : (
                <h3 className="vertical-timeline-element-title" onDoubleClick={() => setIsEditingTitle(true)}> {localTitle} </h3>
            )}

            {isEditingSubtitle ? (
                <input type="text" className="timeline-element-border timeline-subtitle-input" onChange={(e) => setLocalSubtitle(e.target.value)}
                    value={localSubtitle} onBlur={finishEditSubtitle} onKeyDown={(e) => e.key === 'Enter' && finishEditSubtitle()} autoFocus />
            ) : (
                <h4 className="vertical-timeline-element-subtitle" onDoubleClick={() => setIsEditingSubtitle(true)}> {localSubtitle} </h4>
            )}

            {isEditingDescription ? (
                <textarea ref={textareaRef} className="description-editor" value={localDescription} onChange={(e) => setLocalDescription(e.target.value)}
                 onKeyDown={handleKeyDowns} onBlur={finishEditDescription} autoFocus> </textarea>
            ) : (
                <p className="description" onDoubleClick={() => setIsEditingDescription(true)}> {renderDescriptionWithNewlines(localDescription)} </p>
            )}


            <div className="board-select-section">
                <select className="timeline-element-border" defaultValue={1} onChange={handleBoardSelect}>
                    {localBoard && <option value={1}> {localBoard.title}  </option>}
                    <option value={2}> boardTitle...lkadls </option>
                </select>
            </div>
        </VerticalTimelineElement>
    )
}

export default TimelineElement;