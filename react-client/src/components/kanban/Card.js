import { useState } from "react";
import Note from "./Note";

const Card = ({ title, notesResponse, index }) => {
    const [notes, setNotes] = useState(notesResponse);

    return (
        <div>
            <h4> {title} </h4>
            <div> {index} </div>
            {notes && notes.map(note => (
                <div key={note.title}>
                    <Note title={note.title} content={note.content} />
                </div>
            ))}
        </div>
    )
}

export default Card;