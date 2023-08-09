import { useEffect, useState } from 'react';
import '../../css/kanban/Note.css';
import ReactModal from 'react-modal';
import KanbanService from '../../services/KanbanService';

const Note = ({ noteId, title, content, handleDeleteNote }) => {
    const [noteTitle, setNoteTitle] = useState(title);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [text, setText] = useState(content);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setText(content)
        ReactModal.setAppElement('body')
    }, [])

    function updateNoteTitle(e) {
        KanbanService.updateNoteTitle(noteId, noteTitle).then(async (response) => {
            const result = await response.json();
            console.log(result);
        })
        setIsEditingTitle(false);
    }

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function handleKeyDownsEditor(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            setText(prevText => prevText + '\n');
        }

        // ctrl + s
        if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.keyCode === 83) {
            e.preventDefault();
            KanbanService.updateNoteContent(text, noteId).then(async (response) => {
                if (response.ok) {
                    // popup
                    console.log("note content updated");
                }
            });
        }
    }

    function handleKeyDownsTitle(e) {
        if (e.key === 'Enter') {
            updateNoteTitle();
        }
    }

    function toggleMenu(e) {
        e.preventDefault();
        setIsMenuOpen(!isMenuOpen);
        console.log("inside context menu");
    }

    return (
        <div className='note-wrapper' onContextMenu={toggleMenu}>
            <h5 className='note-title' onClick={openModal}> {noteTitle} </h5>

            {isMenuOpen &&
                <ul className="dropdown">
                    <li onClick={(e) => handleDeleteNote(e, noteId)}>Delete</li>
                </ul>}

            <ReactModal
                isOpen={isModalOpen}
                contentLabel="Minimal Modal Example"
                shouldCloseOnOverlayClick={true}
                onRequestClose={closeModal}
                style={{
                    content: {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '90%',
                    }
                }}
            >
                {isEditingTitle
                    ? <input className="title-edit-input-short" type="text" value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)} autoFocus onBlur={updateNoteTitle} onKeyDown={handleKeyDownsTitle} />
                    : <h3 style={{ display: "inline-block", padding: "10px" }} onDoubleClick={() => setIsEditingTitle(true)}> {noteTitle}  </h3>}
                <textarea
                    className='note-editor'
                    onKeyDown={handleKeyDownsEditor}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </ReactModal>

        </div>
    )
}

export default Note;