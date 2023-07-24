import '../../css/kanban/Note.css';

const Note = ({title, content}) => {
    return(
        <div style={{border: "solid", display: "inline-block", padding: "0"}}>
            <h5 style={{padding: "0", margin: "0"}}> {title} </h5>
            <p> {content} </p>
        </div>
    )
}

export default Note;