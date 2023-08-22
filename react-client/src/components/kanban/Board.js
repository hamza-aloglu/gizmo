import { useEffect, useState, useCallback } from "react";
import Column from "./Column";
import KanbanService from "../../services/KanbanService";
import "../../css/kanban/Board.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import DateUtils from "../../utils/DateUtils";

const Board = ({ title, boardId, showSidebar, setShowSidebar, setNotificationMessage, setErrorMessage }) => {
    const [boardTitle, setBoardTitle] = useState(title);
    const [kanbanColumns, setKanbanColumns] = useState([]);
    const [cards, setCards] = useState([]);
    const [isFormActive, setIsFormActive] = useState(false);
    const [newColumnTitle, setNewColumnTitle] = useState("");
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    useEffect(() => {
        KanbanService.getColumns(boardId).then(async (response) => {
            const columns = await response.json();
            setKanbanColumns(columns);
        });

        KanbanService.getCardsByBoard(boardId).then(async (response) => {
            const allCards = await response.json();
            setCards(allCards);
        });
    }, []);

    function handleCreateColumn(e) {
        e.preventDefault();
        KanbanService.createColumn(newColumnTitle, boardId).then(async (response) => {
            const column = await response.json();
            if (response.ok) {
                setKanbanColumns(prevCols => [...prevCols, column]);
            }
        });
        setIsFormActive(false);
    }

    function handleDeleteColumn(e, columnId) {
        KanbanService.deleteColumn(columnId).then(async (response) => {
            if (response.ok) {
                setKanbanColumns(prevCols => prevCols.filter((col) => col.id != columnId));
            }
        });
    }

    function updateBoardTitle(e) {
        KanbanService.updateBoardTitle(boardTitle, boardId).then(async (response) => {
        });
        setIsEditingTitle(false);
    }

    function updateCardIndexes(updateColumnOfCard) {
        setCards((prevCards) => {
            KanbanService.updateCardIndexes(prevCards).then(async (response) => {
                if (response.ok) {
                    console.log("card indexes got updated");

                    // We need to update column of card after indexes got updated because of async fetch calls.
                    // Index of card which its column is updated, remains the same if we don't do like this.
                    if (typeof updateColumnOfCard == "function") {
                        updateColumnOfCard();
                    }
                }
            })

            return prevCards;
        });
    }

    function handleCardTitleUpdate(cardIndex, newTitle) {
        setCards(prevCards => {
            const updatedCards = [...prevCards];
            updatedCards[cardIndex].title = newTitle;
            return updatedCards;
        });
    }

    function handleColumnTitleUpdate(columnIndex, newTitle) {
        setKanbanColumns(prevCols => {
            const updatedCols = [...prevCols];
            updatedCols[columnIndex].title = newTitle;
            return updatedCols;
        });
    }

    function toggleSetForTomorrow(cardIndex) {
        setCards(prevCards => {
            const tmpCards = JSON.parse(JSON.stringify(prevCards));

            const isSetForTomorrow = tmpCards[cardIndex].setForTomorrow;
            const cardId = tmpCards[cardIndex].id;

            if (isSetForTomorrow) {
                // unset db.
                tmpCards[cardIndex].setForTomorrow = false;
                KanbanService.unsetColumnOfCardScheduled(cardId).then(async (response) => {
                })

            }
            else {
                const scheduleTime = DateUtils.getTomorrowDate();
                const doingColumn = kanbanColumns.find(c => c.title == "doing");
                const targetId = doingColumn ? doingColumn.id : null;

                if (targetId == null) {
                    setErrorMessage("There are no doing column exists");
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 3500);
                }
                else {
                    tmpCards[cardIndex].setForTomorrow = true;
                    KanbanService.updateColumnOfCardScheduled(cardId, targetId, scheduleTime).then(async (response) => {
                        if (response.ok) {
                            setNotificationMessage("card will move to doing column tomorrow");
                            setTimeout(() => {
                                setNotificationMessage(null);
                            }, 3500);

                        }
                    });
                }
            }
            return tmpCards;
        })

    }

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setCards((prevCards) => {
            return update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            });

        })
    }, [])

    function handleKeyDownsTitle(e) {
        if (e.key == "Enter") {
            updateBoardTitle();
        }
    }


    const renderColumn = useCallback((column, i) => {
        return (
            <Column
                key={column.id}
                columnId={column.id}
                title={column.title}
                restrictedKanbanColumns={column.restrictedKanbanColumns}
                colIndex={i}

                cards={cards}
                setAllCards={setCards}
                moveCard={moveCard}
                updateCardIndexes={updateCardIndexes}
                handleDeleteColumn={handleDeleteColumn}
                handleCardTitleUpdate={handleCardTitleUpdate}
                handleColumnTitleUpdate={handleColumnTitleUpdate}
                toggleSetForTomorrow={toggleSetForTomorrow}
                setNotificationMessage={setNotificationMessage}
            />
        )
    })

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="board-wrapper">
                <div id="board-header-section">
                    <div id="board-title-wrapper">
                        <div>
                            <button className="sidebar-toggle-btn"
                                onClick={() => setShowSidebar(!showSidebar)}
                                title="toggle sidebar"
                            >
                                {showSidebar ? <span className="arrow-icon-left"></span> : <span className="arrow-icon-right"></span>}
                            </button>
                        </div>
                        {isEditingTitle
                            ? <input className="title-edit-input" type="text" value={boardTitle}
                                onChange={(e) => setBoardTitle(e.target.value)} autoFocus onBlur={updateBoardTitle} onKeyDown={handleKeyDownsTitle} />
                            : <h3 id="board-title" onDoubleClick={() => setIsEditingTitle(true)}> {boardTitle} </h3>}
                    </div>
                </div>
                <div className="container">
                    <div id="columns-wrapper">
                        {kanbanColumns && kanbanColumns.map((kanbanColumn, i) => renderColumn(kanbanColumn, i)
                        )}

                        <div className="column-container">
                            {!isFormActive &&
                                <button className="long-button" onClick={() => setIsFormActive(true)}> Create Column </button>}

                            {isFormActive &&
                                <form onSubmit={handleCreateColumn}>
                                    <input className="title-edit-input" type="text" onChange={(e) => setNewColumnTitle(e.target.value)}
                                        autoFocus onBlur={() => setIsFormActive(false)} />
                                </form>}
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    )
}

export default Board;