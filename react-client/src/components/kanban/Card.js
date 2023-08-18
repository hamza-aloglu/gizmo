import { useEffect, useRef, useState } from "react";
import Note from "./Note";
import KanbanService from "../../services/KanbanService";
import '../../css/kanban/Card.css';
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";

const Card = ({ title, index, id, moveCard, updateCardIndexes, columnId, handleDeleteCard, handleCardTitleUpdate, toggleSetForTomorrow, setForTomorrow }) => {
    const [cardTitle, setCardTitle] = useState(title);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isFormActive, setIsFormActive] = useState(false);
    const [newNoteTitle, setNewNoteTitle] = useState("");
    const [isContentVisible, setIsContentVisible] = useState(false);
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
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    let greenShadow = "";
    if(setForTomorrow) {
        greenShadow = "green-shadow";
    }

    console.log(setForTomorrow);

    return (
        <div className={`card-wrapper ${greenShadow}`} ref={ref} style={{ opacity }}>
            <div className="card-title-container" onClick={toggleContent}>
                {notes && notes.length != 0 && <span className="symbol">↓</span>}
                {isEditingTitle
                    ? <input className="title-edit-input" type="text" value={cardTitle}
                        onChange={(e) => handleCardTitleChange(e)} autoFocus onBlur={updateCardTitle} onKeyDown={handleKeyDownsTitle} />
                    : <h4 className="card-title" onDoubleClick={() => setIsEditingTitle(true)}> {cardTitle}  </h4>}
            </div>
            {isContentVisible &&
                <div className="content-wrapper">
                    <div className="notes-wrapper">
                        <hr />
                        {notes && notes.map(note => (
                            <Note key={note.id} noteId={note.id} title={note.title} content={note.content}
                                handleDeleteNote={handleDeleteNote} />
                        ))}
                    </div>

                    <div className="set-for-tomorrow-container">
                        <button onClick={handleSetForTomorrowClick} className="arrow-button">&#9654;</button>
                    </div>

                    {!isFormActive && <button className="note-create-button" onClick={() => setIsFormActive(true)}> Create Note </button>}
                    {isFormActive && <form style={{ display: "inline-block" }} onSubmit={handleCreateNote}>
                        <input className="note-create-input" type="text" onChange={(e) => setNewNoteTitle(e.target.value)}
                            autoFocus onBlur={() => setIsFormActive(false)} />
                    </form>}

                    <div className="delete-card-container">
                        <button className="delete-card" onClick={(e) => handleDeleteCard(e, id)}>Delete</button>
                    </div>
                </div>
            }

        </div>
    )
}

export default Card;