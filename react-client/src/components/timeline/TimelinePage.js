import { useState, useRef, useEffect } from "react";
import Header from "../Header";
import '../../css/timeline/TimelinePage.css';
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import TimelineElement from "./TimelineElement";
import TimelineService from "../../services/TimelineService";
import { useNavigate, useParams } from "react-router";
import KanbanService from "../../services/KanbanService";
import DropdownMenu from "../DropdownMenu";

const TimelinePage = ({ }) => {
    const textareaRef = useRef(null);
    const timelineId = useParams().timelineId;

    const [title, setTitle] = useState("default title ...");
    const [timelineElements, setTimelineElements] = useState([]);

    const emptyFormData = {
        title: '',
        subtitle: '',
        date: '',
        description: '',
        timelineId: timelineId,
        boardId: null,
    };
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(emptyFormData);
    const [boards, setBoards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        TimelineService.getTimeline(timelineId).then(async (response) => {
            const timelineResponse = await response.json();
            if (response.ok) {
                const timelineElements = timelineResponse.timelineElements;

                timelineElements.sort((a, b) => {
                    if (a.createdAt > b.createdAt) {
                        return 1;
                    } else if (a.createdAt < b.createdAt) {
                        return -1;
                    }
                    return 0;
                });
                setTimelineElements(timelineElements);
                setTitle(timelineResponse.title);
            }
        });

        KanbanService.fetchBoards().then(async (response) => {
            const boardsResponse = await response.json();
            if (response.ok) {
                setBoards(boardsResponse);
            }
        })
    }, []);

    useEffect(() => {
        function adjustHeight() {
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
        }
        adjustHeight();
    }, [formData]);

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
                createdAt={tElement.createdAt}
                boards={boards}
                deleteTimelineElement={deleteTimelineElement}
            />
        )
    }

    const handleUpdate = (index, updatedElement) => {
        const newElements = [...timelineElements];
        newElements[index] = updatedElement;
        setTimelineElements(newElements);
    };

    function handleKeyDowns(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            const start = event.target.selectionStart;
            const end = event.target.selectionEnd;
            const spaces = "    ";  // 4 spaces
            console.log(formData);
            setFormData(prevFormData => ({
                ...prevFormData,
                description: prevFormData.description.substring(0, start) + spaces + prevFormData.description.substring(end)
            }));
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = start + 4;
                    textareaRef.current.selectionEnd = start + 4;
                }
            }, 0);
        }
    }

    function handleCreateTimelineElement(e) {
        e.preventDefault();
        TimelineService.createTimelineElement(formData).then(async (response) => {
            const newTimelineElement = await response.json();
            if (response.ok) {
                setTimelineElements(prev => [...prev, newTimelineElement]);
                setShowForm(false);
                setFormData(emptyFormData);
            } else {
                // Handle error, maybe show a message to the user.
                console.error('Error creating new timeline element:', newTimelineElement);
            }
        });
    }

    function deleteTimelineElement(e, timelineId) {
        TimelineService.deleteTimelineElement(timelineId).then(async (response) => {
            if (response.ok) {
                setTimelineElements(prevTes => prevTes.filter(te => te.id != timelineId));
            }
        });
    }

    function deleteTimeline(e) {
        TimelineService.deleteTimeline(timelineId).then(async (response) => {
            if (response.ok) {
                navigate('/');
            }
        });
    }

    return (
        <div>
            <Header />
            <div className="timeline-title-section">
                {title}
                <div style={{ fontSize: 'medium' }}>
                    <DropdownMenu type={"Timeline"} handleDelete={deleteTimeline} />
                </div>
            </div>



            <VerticalTimeline>

                {timelineElements && timelineElements.map((te, index) => renderTimelineElement(te, index))}

                {showForm && (
                    <form onSubmit={handleCreateTimelineElement}>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(33, 150, 243)', color: 'black' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            date={<input type="date" className="timeline-element-border" onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                value={formData.date} />}
                        >
                            <input
                                type="text"
                                className="timeline-element-border timeline-title-input"
                                placeholder="Title"
                                value={formData.title}
                                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            />

                            <input type="text" className="timeline-element-border timeline-subtitle-input" value={formData.subtitle}
                                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))} placeholder="subtitle" />
                            {/* Similarly add other input fields */}

                            <textarea ref={textareaRef} className="description-editor" value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                onKeyDown={handleKeyDowns} />

                            <div className="board-select-section">
                                <select className="timeline-element-border" defaultValue={0}
                                    onChange={(e) => setFormData(prev => ({ ...prev, boardId: e.target.value }))}>
                                    <option value={0}> none </option>
                                    {boards && boards.map(b => <option key={b.id} value={b.id}> {b.title} </option>)}
                                </select>
                            </div>

                            <button className="small-btn" type="submit">Submit</button>
                            <button className="small-btn bg-redish" style={{ marginLeft: "5px" }} type="reset" onClick={() => setShowForm(false)}>Cancel</button>
                        </VerticalTimelineElement>
                    </form>
                )}

                {!showForm && <button className="header-button bg-blueish" onClick={() => setShowForm(true)}>Create timeline element</button>}


            </VerticalTimeline>


        </div>
    )
}

export default TimelinePage;