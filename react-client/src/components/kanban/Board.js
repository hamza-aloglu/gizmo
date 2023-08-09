import { useEffect, useState, useCallback } from "react";
import Column from "./Column";
import KanbanService from "../../services/KanbanService";
import "../../css/kanban/Board.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

const Board = ({ title, boardId }) => {
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
            const result = await response.json
            console.log(result);
            if (response.ok) {
                // create pop-up
                console.log("successfully updated board title");
            }
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


    const renderColumn = useCallback((column) => {
        return (
            <Column
                key={column.id}
                columnId={column.id}
                title={column.title}
                restrictedKanbanColumns={column.restrictedKanbanColumns}

                cards={cards}
                setAllCards={setCards}
                moveCard={moveCard}
                updateCardIndexes={updateCardIndexes}
                handleDeleteColumn={handleDeleteColumn}
            />
        )
    })

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="board-wrapper">
                <div id="board-header-section">
                    <div id="board-title-wrapper">
                        {isEditingTitle
                            ? <input className="title-edit-input" type="text" value={boardTitle}
                                onChange={(e) => setBoardTitle(e.target.value)} autoFocus onBlur={updateBoardTitle} onKeyDown={handleKeyDownsTitle} />
                            : <h3 id="board-title" onDoubleClick={() => setIsEditingTitle(true)}> {boardTitle} </h3>}
                    </div>
                </div>
                <div id="columns-wrapper">
                    {kanbanColumns && kanbanColumns.map(kanbanColumn => renderColumn(kanbanColumn)
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
        </DndProvider>
    )
}

export default Board;