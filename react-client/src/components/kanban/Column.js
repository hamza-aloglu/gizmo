import { useCallback, useState } from "react";
import KanbanService from "../../services/KanbanService";
import '../../css/kanban/Column.css';
import Card from "./Card";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
import update from "immutability-helper";

const Column = ({ title, setAllCards, cards, columnId, restrictedKanbanColumns, moveCard, updateCardIndexes }) => {
    const [columnTitle, setColumnTitle] = useState(title);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isFormActive, setIsFormActive] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState("");
    const columnObject = { id: columnId, title: title, restrictedKanbanColumns: restrictedKanbanColumns };
    const [{isOver, item }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                isOver: monitor.isOver(),
                item: monitor.getItem(),
            }
        },
        drop(item) {
            if (item.columnId == columnId) {
                return;
            }

            // move column of card.
            setAllCards(prevCards => {
                const draggedCard = prevCards[item.index];
                draggedCard.kanbanColumn = columnObject;

                // Whenever a card moves to another column
                // its index is updated to be the last element and other elements splice before that
                const resultCards = update(prevCards, {
                    $splice: [
                        [item.index, 1],
                        [prevCards.length - 1, 0, prevCards[item.index]],
                    ],
                });
                
                // Why I don't have to populate item in here but I had to in moving cards?
                item.index = prevCards.length - 1;
                item.initialDragIndex = prevCards.length - 1;
                item.columnId = columnId;

                return resultCards;
            });

            // persist column information
            updateCardIndexes(() => {
                KanbanService.updateColumnOfCard(item.id, columnId).then(async (response) => {
                    if (response.ok) {
                        console.log("changed column of card");
                    }
                });
            });
        }
    });

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

    const renderCard = useCallback((card, index) => {
        if (card.kanbanColumn.id == columnId) {
            return (
                <Card
                    key={card.id}
                    index={index}
                    id={card.id}
                    title={card.title}
                    moveCard={moveCard}
                    updateCardIndexes={updateCardIndexes}
                    columnId={columnId}
                />
            );
        }
    }, []);

    let opacity = 1;
    if (isOver && columnId != item.columnId) {
        opacity = 0.5;
    }

    return (
        <div ref={drop} className="column-wrapper" style={{ opacity }}>
            <div className="column-title">
                {isEditingTitle ? <input type="text" value={columnTitle} onChange={(e) => setColumnTitle(e.target.value)} autoFocus onBlur={updateColumnTitle} />
                    : <h5 id="board-title" onDoubleClick={() => setIsEditingTitle(true)}> {columnTitle} </h5>}
            </div>
            <hr />
            {cards && cards.map((card, i) => renderCard(card, i))}
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