import { useEffect, useState } from 'react';
import '../../css/kanban/Note.css';
import ReactModal from 'react-modal';
import KanbanService from '../../services/KanbanService';

const Note = ({ noteId, title, content, handleDeleteNote }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [text, setText] = useState(content);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setText(content)
        ReactModal.setAppElement('body')
    }, [])

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function handleKeyDowns(e) {
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

    function toggleMenu(e) {
        e.preventDefault();
        setIsMenuOpen(!isMenuOpen);
        console.log("inside context menu");
    }

    return (
        <div className='note-wrapper' onContextMenu={toggleMenu}>
            <h5 className='note-title' onClick={openModal}> {title} </h5>

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
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '90%',
                    }
                }}
            >
                <textarea
                    className='note-editor'
                    onKeyDown={handleKeyDowns}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </ReactModal>

        </div>
    )
}

export default Note;