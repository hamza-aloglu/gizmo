import { useState } from "react";
import Note from "./Note";
import KanbanService from "../../services/KanbanService";
import '../../css/kanban/Card.css';
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";

const Card = ({ title, notesResponse, index, id }) => {
    const [cardTitle, setCardTitle] = useState(title);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [notes, setNotes] = useState(notesResponse);
    const [isFormActive, setIsFormActive] = useState(false);
    const [newNoteTitle, setNewNoteTitle] = useState("");
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

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

    return (
        <div className={`card-wrapper`} ref={drag}>
            <div className="card-title-container" onClick={toggleContent}>
                {notes && notes.length != 0 && <span className="symbol">↓</span>}
                {isEditingTitle ? <input type="text" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} autoFocus onBlur={updateCardTitle}/> :
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