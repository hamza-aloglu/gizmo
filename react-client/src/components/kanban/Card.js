import { useState } from "react";
import Note from "./Note";
import KanbanService from "../../services/KanbanService";
import '../../css/kanban/Card.css';

const Card = ({ title, notesResponse, index, cardId }) => {
    const [notes, setNotes] = useState(notesResponse);
    const [isFormActive, setIsFormActive] = useState(false);
    const [newNoteTitle, setNewNoteTitle] = useState("");

    function handleCreateNote(e) {
        e.preventDefault();
        KanbanService.createNote(newNoteTitle, cardId).then(async (response) => {
            const note = await response.json();
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

    return (
        <div className="card-wrapper">
            <h4 style={{ textAlign: "center" }}> {title} </h4>
            <p style={{ fontSize: "12px" }}> index: {index} </p>
            <div className="notes-wrapper">
                {notes && notes.map(note => (
                    <div className="note-wrapper" key={note.title}>
                        <Note title={note.title} content={note.content} />
                    </div>
                ))}
            </div>
            {!isFormActive && <button onClick={() => setIsFormActive(true)}> Create Note </button>}
            {isFormActive && <form style={{ display: "inline-block" }} onSubmit={handleCreateNote}>
                <input type="text" onChange={(e) => setNewNoteTitle(e.target.value)} />
            </form>}
        </div>
    )
}

export default Card;