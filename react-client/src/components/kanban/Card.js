import { useRef, useState } from "react";
import Note from "./Note";
import KanbanService from "../../services/KanbanService";
import '../../css/kanban/Card.css';
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";

const Card = ({ title, notesResponse, index, id, moveCard }) => {
    const [cardTitle, setCardTitle] = useState(title);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [notes, setNotes] = useState(notesResponse);
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
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
          return { id, index }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      })

    function handleCreateNote(e) {
        e.preventDefault();
        KanbanService.createNote(newNoteTitle, id).then(async (response) => {
            const note = await response.json(); // deserialize data.
            if (response.ok) {
                const newNotes = [];
                if (notes != null) {
                    newNotes.push(...notes);
                }
                newNotes.push(note);
                setNotes(newNotes);
            }
        });
        setIsFormActive(false);
    }

    function toggleContent(e) {
        setIsContentVisible(!isContentVisible);
    }

    function updateCardTitle(e) {
        KanbanService.updateCardTitle(cardTitle, id).then(async (response) => {
            const result = await response.json();
            console.log(result);
        });
        setIsEditingTitle(false);
    }

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        <div className={`card-wrapper`} ref={ref} style={{ opacity }}>
            <div className="card-title-container" onClick={toggleContent}>
                {notes && notes.length != 0 && <span className="symbol">↓</span>}
                {isEditingTitle ? <input type="text" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} autoFocus onBlur={updateCardTitle} /> :
                    <h4 className="card-title" onDoubleClick={() => setIsEditingTitle(true)}> {cardTitle}  </h4>}
            </div>
            {isContentVisible &&
                <div className="notes-wrapper">
                    <hr />
                    {notes && notes.map(note => (
                        <div key={note.id}>
                            <Note noteId={note.id} title={note.title} content={note.content} />
                        </div>
                    ))}
                </div>
            }
            {!isFormActive && isContentVisible && <button className="note-create-button" onClick={() => setIsFormActive(true)}> Create Note </button>}
            {isFormActive && isContentVisible && <form style={{ display: "inline-block" }} onSubmit={handleCreateNote}>
                <input className="note-create-input" type="text" onChange={(e) => setNewNoteTitle(e.target.value)} />
            </form>}

        </div>
    )
}

export default Card;