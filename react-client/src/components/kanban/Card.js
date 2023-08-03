import { useRef, useState } from "react";
import Note from "./Note";
import KanbanService from "../../services/KanbanService";
import '../../css/kanban/Card.css';
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";

const Card = ({ title, notesResponse, index, id, moveCard, updateCardIndexes }) => {
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
            if (dragIndex === hoverIndex) {
                return
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
            if(item.initialDragIndex == dropIndex) {
                return;
            }

            updateCardIndexes();
            item.initialDragIndex = dropIndex;
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
          return { id, index, initialDragIndex: index }
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