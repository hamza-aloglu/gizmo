import { useCallback, useState, useEffect } from "react";
import KanbanService from "../../services/KanbanService";
import '../../css/kanban/Column.css';
import Card from "./Card";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
import update from "immutability-helper";

const Column = ({ title, setAllCards, cards, columnId, restrictedKanbanColumns, moveCard, updateCardIndexes,
     handleDeleteColumn, handleCardTitleUpdate, handleColumnTitleUpdate, colIndex, toggleSetForTomorrow }) => {
    const [columnTitle, setColumnTitle] = useState(title);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isFormActive, setIsFormActive] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState("");
    const columnObject = { id: columnId, title: title, restrictedKanbanColumns: restrictedKanbanColumns };
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [{ isOver, item }, drop] = useDrop({
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

                const updatedCards = JSON.parse(JSON.stringify(prevCards));

                updatedCards[item.index].kanbanColumn = columnObject;

                // Whenever a card moves to another column
                // its index is updated to be the last element and other elements splice before that
                const resultCards = update(updatedCards, {
                    $splice: [
                        [item.index, 1],
                        [updatedCards.length - 1, 0, updatedCards[item.index]],
                    ],
                });

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

    function handleDeleteCard(e, cardId) {
        KanbanService.deleteCard(cardId).then(async (response) => {
            if (response.ok) {
                setAllCards(prevCards => prevCards.filter(c => c.id != cardId))
            }
        });
    }

    function updateColumnTitle(e) {
        KanbanService.updateColumnTitle(columnTitle, columnId).then(async (response) => {
        });
        handleColumnTitleUpdate(colIndex, columnTitle);
        setIsEditingTitle(false);
    }

    function handleKeyDownsTitle(e) {
        if (e.key == "Enter") {
            updateColumnTitle();
        }
    }

    const renderCard = useCallback((card, index) => {
        if (card.kanbanColumn.id == columnId) {
            return (
                <Card
                    key={card.id}
                    index={index}
                    id={card.id}
                    title={card.title}
                    setForTomorrow={card.setForTomorrow}

                    moveCard={moveCard}
                    updateCardIndexes={updateCardIndexes}
                    columnId={columnId}
                    handleDeleteCard={handleDeleteCard}
                    handleCardTitleUpdate={handleCardTitleUpdate}
                    toggleSetForTomorrow={toggleSetForTomorrow}
                />
            );
        }
    }, []);

    let opacity = 1;
    if (isOver && columnId != item.columnId) {
        opacity = 0.5;
    }

    let chunkColumn = "";
    if (columnTitle.toLowerCase() == "chunk") {
        chunkColumn = "chunk-column";
    }

    return (
        <div className={`column-container ${chunkColumn}`}>
            <div ref={drop} className="column-wrapper" style={{ opacity }}>
                <div className="menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {isMenuOpen && (
                    <ul className="dropdown">
                        <li onClick={(e) => handleDeleteColumn(e, columnId)}>Delete Column</li>
                    </ul>
                )}

                <div className="column-title">
                    {isEditingTitle
                        ? <input className="title-edit-input" type="text" value={columnTitle}
                            onChange={(e) => setColumnTitle(e.target.value)} autoFocus onBlur={updateColumnTitle} onKeyDown={handleKeyDownsTitle} />
                        : <h5 id="board-title" onDoubleClick={() => setIsEditingTitle(true)}> {columnTitle} </h5>}
                </div>
                <hr />
                {cards && cards.map((card, i) => renderCard(card, i))}
                <div className="create-card-container">
                    {!isFormActive && <button className="long-button" onClick={() => setIsFormActive(true)}> Create Card </button>}
                    {isFormActive && <form onSubmit={(e) => handleCreateCard(e, columnId, newCardTitle)}>
                        <input className="title-edit-input" type="text" onChange={(e) => setNewCardTitle(e.target.value)}
                            autoFocus onBlur={() => setIsFormActive(false)} />
                    </form>}
                </div>
            </div>
        </div>
    )
}

export default Column;