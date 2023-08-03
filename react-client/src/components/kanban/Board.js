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

    function updateBoardTitle(e) {
        // send update request
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

    function updateCardIndexes() {
        setCards((prevCards) => {
            KanbanService.updateCardIndexes(prevCards).then(async (response) => {
                if (response.ok) {
                    console.log("card indexes got updated")
                }
            })

            return prevCards;
        });
    }

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }),
        )
    }, [])

    function getCardsByColumn(columnId) {
        return cards.filter(c => c.kanbanColumn.id == columnId);
    }

    const renderColumn = useCallback((column) => {
        return (
            <div key={column.id} className="column-container">
                <Column
                    columnId={column.id}
                    title={column.title}
                    restrictedKanbanColumns={column.restrictedKanbanColumns}

                    cards={getCardsByColumn(column.id)}
                    setAllCards={setCards}
                    moveCard={moveCard}
                    updateCardIndexes={updateCardIndexes}
                />
            </div>
        )
    })

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="board-wrapper">
                <div id="board-title-wrapper">
                    {isEditingTitle
                        ? <input type="text" value={boardTitle} onChange={(e) => setBoardTitle(e.target.value)} autoFocus onBlur={updateBoardTitle} />
                        : <h3 id="board-title" onDoubleClick={() => setIsEditingTitle(true)}> {boardTitle} </h3>}
                </div>
                <div id="columns-wrapper">
                    {kanbanColumns && kanbanColumns.map(kanbanColumn => renderColumn(kanbanColumn))}

                    <div className="column-container">
                        {!isFormActive &&
                            <button className="long-button" onClick={() => setIsFormActive(true)}> Create Column </button>}

                        {isFormActive &&
                            <form onSubmit={handleCreateColumn}>
                                <input className="long-input" type="text" onChange={(e) => setNewColumnTitle(e.target.value)} />
                            </form>}
                    </div>
                </div>
            </div>
        </DndProvider>
    )
}

export default Board;