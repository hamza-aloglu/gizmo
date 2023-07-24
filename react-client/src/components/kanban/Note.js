import '../../css/kanban/Note.css';

const Note = ({title, content}) => {
    return(
        <div className='note-wrapper'>
            <h5 className='note-title'> {title} </h5>
        </div>
    )
}

export default Note;