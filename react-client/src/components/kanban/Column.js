import { useState } from "react";
import KanbanService from "../../services/KanbanService";
import '../../css/kanban/Column.css';
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
import Card from "./Card";

const Column = ({ title, setAllCards, cards, columnId, restrictedKanbanColumns }) => {
    const [isFormActive, setIsFormActive] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState("");
    const columnObject = {id: columnId, title: title, restrictedKanbanColumns: restrictedKanbanColumns };
    const [{ isOver, canDrop, draggedCardReference }, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            drop: (draggedCardReference) => moveCard(draggedCardReference),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
                draggedCardReference: monitor.getItem(),
            })
        })
    );

    function moveCard(draggedCardReference) {
        setAllCards((prevCards) => {
            const newCards = prevCards.map(c => {
                if (c.id == draggedCardReference.id) {
                    c.kanbanColumn = columnObject;
                }
                return c;
            });

            return newCards;
        });
    }

    function handleCreateCard(e) {
        e.preventDefault();
        KanbanService.createCard(newCardTitle, columnId).then(async (response) => {
            const card = await response.json();
            if (response.ok) {
                setAllCards(prevCards => [...prevCards, card]);
            }
        });
        setIsFormActive(false);
    }


    return (
        <div className="column-wrapper" ref={drop}>
            <h4 className="column-title"> {title} </h4>
            <hr />
            {cards && cards.map(card => (
                <div key={card.id}>
                    <Card id={card.id} title={card.title} notesResponse={card.notes} index={card.index} />
                </div>
            ))}
            <div className="create-card-container">
                {!isFormActive && <button className="long-button" onClick={() => setIsFormActive(true)}> Create Card </button>}
                {isFormActive && <form onSubmit={(e) => handleCreateCard(e, columnId, newCardTitle)}>
                    <input className="long-input" type="text" onChange={(e) => setNewCardTitle(e.target.value)} />
                </form>}
            </div>
        </div>
    )
}

export default Column;