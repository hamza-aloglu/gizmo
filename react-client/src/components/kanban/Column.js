import { useState } from "react";
import KanbanService from "../../services/KanbanService";
import '../../css/kanban/Column.css';
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
import Card from "./Card";

const Column = ({ title, setAllCards, cards, columnId, restrictedKanbanColumns }) => {
    const [columnTitle, setColumnTitle] = useState(title);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isFormActive, setIsFormActive] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState("");
    const columnObject = { id: columnId, title: title, restrictedKanbanColumns: restrictedKanbanColumns };
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
        let sourceColumnId;
        setAllCards((prevCards) => {
            const newCards = prevCards.map(c => {
                if (c.id == draggedCardReference.id) {
                    sourceColumnId = c.kanbanColumn.id;
                    c.kanbanColumn = columnObject;
                }
                return c;
            });

            return newCards;
        });
        // send put request. Change column of card. sourceColumnId, targetColumnId, cardId.
        KanbanService.updateColumnOfCard(sourceColumnId, columnId, draggedCardReference.id).then(async (response) => {
            if(response.ok) {
                console.log("updated column of card");
            }
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

    function updateColumnTitle(e) {
        KanbanService.updateColumnTitle(columnTitle, columnId).then(async (response) => {
            const result = await response.json();
            console.log(result);
        });
        setIsEditingTitle(false);
    }


    return (
        <div className="column-wrapper" ref={drop}>
            <div className="column-title">
                {isEditingTitle ? <input type="text" value={columnTitle} onChange={(e) => setColumnTitle(e.target.value)} autoFocus onBlur={updateColumnTitle} />
                    : <h5 id="board-title" onDoubleClick={() => setIsEditingTitle(true)}> {columnTitle} </h5>}
            </div>
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