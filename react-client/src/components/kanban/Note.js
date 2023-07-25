import { useEffect, useState } from 'react';
import '../../css/kanban/Note.css';
import ReactModal from 'react-modal';

const Note = ({ title, content }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        setText(content)
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
        if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode === 83) {
            e.preventDefault();
            // Send put request to note endpoint with body text.
        }
    }

    return (
        <div className='note-wrapper'>
            <h5 className='note-title' onClick={openModal}> {title} </h5>

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