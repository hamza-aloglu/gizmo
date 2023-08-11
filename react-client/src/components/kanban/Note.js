import { useEffect, useRef, useState } from 'react';
import '../../css/kanban/Note.css';
import ReactModal from 'react-modal';
import KanbanService from '../../services/KanbanService';
import Info from '../notification/Info';

const Note = ({ noteId, title, content, handleDeleteNote }) => {
    const [noteTitle, setNoteTitle] = useState(title);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [text, setText] = useState(content);
    const prevTextRef = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [notficationMessage, setNotificationMessage] = useState(null);

    useEffect(() => {
        setText(content)
        prevTextRef.current = content;
        ReactModal.setAppElement('body')
    }, [])

    function updateNoteTitle(e) {
        KanbanService.updateNoteTitle(noteId, noteTitle).then(async (response) => {
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
            if(prevTextRef.current != text) {
                KanbanService.updateNoteContent(text, noteId).then(async (response) => {
                    if (response.ok) {
                        setNotificationMessage("content has saved");
                        prevTextRef.current = text;
                        setTimeout(() => {
                            setNotificationMessage(null);
                        }, 1400);
                    }
                });
            }
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

    const isNotificationVisible = notficationMessage ? "visible" : "hidden";

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
                <div style={{visibility: isNotificationVisible}}>
                    <Info message={notficationMessage} />
                </div>
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