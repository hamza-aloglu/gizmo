import { useEffect, useRef, useState } from "react";
import Note from "./Note";
import KanbanService from "../../services/KanbanService";
import '../../css/kanban/Card.css';
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
import WheelSelector from "./WheelSelector";
import moment from "moment-timezone";

const Card = ({ title, index, id, moveCard, updateCardIndexes, columnId, handleDeleteCard, handleCardTitleUpdate,
    toggleSetForTomorrow, setForTomorrow, setNotificationMessage, columnTitle, cards, difficulty, priority, deadlineParam,
    parentCardId }) => {
    const [cardTitle, setCardTitle] = useState(title);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isFormActive, setIsFormActive] = useState(false);
    const [newNoteTitle, setNewNoteTitle] = useState("");
    const [isContentVisible, setIsContentVisible] = useState(false);
    // FIX: Timezone difference between client and server.
    if(deadlineParam != null) {
        deadlineParam = moment(deadlineParam).tz("Europe/Istanbul").format("YYYY-MM-DD")
    }
    const [deadline, setDeadline] = useState(deadlineParam ? deadlineParam : "");
    const [parentTask, setParentTask] = useState(parentCardId);
    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }

            if (item.columnId != columnId) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
        drop(item) {
            const dropIndex = index;
            if (item.initialDragIndex == dropIndex) {
                return;
            }
            if (item.columnId != columnId) {
                return;
            }
            updateCardIndexes();
            item.initialDragIndex = dropIndex;
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index, initialDragIndex: index, columnId }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    useEffect(() => {
        KanbanService.getNotes(id).then(async (response) => {
            const responseNotes = await response.json();
            setNotes(responseNotes);
        });
    }, [])

    function handleCreateNote(e) {
        e.preventDefault();
        KanbanService.createNote(newNoteTitle, id).then(async (response) => {
            const note = await response.json(); // deserialize data.
            if (response.ok) {
                setNotes(prevNotes => [...prevNotes, note]);
            }
        });
        setIsFormActive(false);
    }

    function handleDeleteNote(e, noteId) {
        KanbanService.deleteNote(noteId).then(async (response) => {
            if (response.ok) {
                setNotes(prevNotes => prevNotes.filter(n => n.id != noteId));
            }
        })
    }

    function toggleContent(e) {
        setIsContentVisible(!isContentVisible);
    }

    function handleSetForTomorrowClick(e) {
        toggleSetForTomorrow(index);
    }

    function updateCardTitle(e) {
        KanbanService.updateCardTitle(cardTitle, id).then(async (response) => {
        });
        setIsEditingTitle(false);
    }

    function handleKeyDownsTitle(e) {
        if (e.key == "Enter") {
            updateCardTitle();
        }
    }

    function handleCardTitleChange(e) {
        setCardTitle(e.target.value);
        // Synchronize title within cards state and with title state.
        handleCardTitleUpdate(index, e.target.value);
    }

    function updateDifficulty(difficulty, setDifficultyCircle) {
        KanbanService.updateCardDifficulty(difficulty, id).then(async (response) => {
            if (response.ok) {
                setDifficultyCircle(difficulty);
            }
        });
    }

    function updatePriority(priority, setPriorityCircle) {
        KanbanService.updateCardPriority(priority, id).then(async (response) => {
            if (response.ok) {
                setPriorityCircle(priority);
            }
        });
    }

    function updateDeadline(e) {
        setDeadline(e.target.value);
        let date = e.target.value + "T00:00:00";

        KanbanService.updateCardDeadline(date, id).then(async (response) => {
            if (response.ok) {
            }
        });
    }

    function updateParentTask(e) {
        setParentTask(e.target.value);
        KanbanService.updateParentTask(e.target.value, id).then(async (response) => {
        });
    }

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    let greenShadow = "";
    if (setForTomorrow) {
        greenShadow = "green-shadow";
    }

    let canSetForTomorrow = false;
    if (columnTitle.toLowerCase() == "todo") {
        canSetForTomorrow = true;
    }

    return (
        <div className={`card-wrapper ${greenShadow}`} ref={ref} style={{ opacity }}>
            <div className="card-title-container" onClick={toggleContent}>
                {notes && notes.length != 0 && <span className="symbol">↓</span>}
                {isEditingTitle
                    ? <input className="title-edit-input" type="text" value={cardTitle}
                        onChange={(e) => handleCardTitleChange(e)} autoFocus onBlur={updateCardTitle} onKeyDown={handleKeyDownsTitle} />
                    : <h3 className="card-title" onDoubleClick={() => setIsEditingTitle(true)}> {cardTitle}  </h3>}
            </div>
            {isContentVisible &&
                <div className="content-wrapper">
                    <hr />

                    <div className="selector-container">
                        <h5>Difficulty</h5>
                        <WheelSelector numberOfCircles={10} circleWidth={22} circleHeight={22} update={updateDifficulty} initCircle={difficulty} />
                    </div>
                    <div className="selector-container">
                        <h5>Priority</h5>
                        <WheelSelector numberOfCircles={10} circleWidth={22} circleHeight={22} update={updatePriority} initCircle={priority} />
                    </div>
                    <div className="ga-properties-container">
                        <div className="deadline-container">
                            <h5>Deadline</h5>
                            <input type="date" className="deadline-date" value={deadline} onChange={updateDeadline} />
                        </div>

                        <div className="parent-task-container">
                            <h5>Parent Task</h5>
                            <select className="task-select" onChange={(e) => updateParentTask(e)}
                                defaultValue={parentTask ? parentTask : "none"}>
                                <option value="none" disabled>None</option>
                                {cards.map((card) => {
                                    if (card.id !== id) {
                                        return <option key={card.id} value={card.id}>{card.title}</option>;
                                    }
                                })}
                            </select>
                        </div>

                    </div>

                    <div className="notes-wrapper">
                        {notes && notes.map(note => (
                            <Note key={note.id} noteId={note.id} title={note.title} content={note.content}
                                handleDeleteNote={handleDeleteNote} setNotificationMessage={setNotificationMessage} />
                        ))}
                    </div>

                    {canSetForTomorrow &&
                        <div className="set-for-tomorrow-container">
                            <button onClick={handleSetForTomorrowClick} className="arrow-button">&#9654;</button>
                        </div>
                    }

                    <div style={{ textAlign: 'center' }}>
                        {!isFormActive && <button className="small-btn" onClick={() => setIsFormActive(true)}>
                            Create Note
                        </button>}
                    </div>
                    {isFormActive && <form style={{ display: "inline-block" }} onSubmit={handleCreateNote}>
                        <input className="note-create-input" type="text" onChange={(e) => setNewNoteTitle(e.target.value)}
                            autoFocus onBlur={() => setIsFormActive(false)} />
                    </form>}

                    <hr />

                    <div className="delete-card-container">
                        <button className="delete-card" onClick={(e) => handleDeleteCard(e, id)}>Delete</button>
                    </div>
                </div>
            }

        </div>
    )
}

export default Card;