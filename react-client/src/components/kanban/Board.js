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
                const newKanbanColumns = [];
                if (kanbanColumns != null) {
                    newKanbanColumns.push(...kanbanColumns);
                }
                newKanbanColumns.push(column);

                setKanbanColumns(newKanbanColumns);
            }
        });
        setIsFormActive(false);
    }

    function getCardsByColumn(columnId) {
        return cards.filter(c => c.kanbanColumn.id == columnId);
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

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]]
                ]
            })
        );
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="board-wrapper">
                <div id="board-title-wrapper">
                    {isEditingTitle
                        ? <input type="text" value={boardTitle} onChange={(e) => setBoardTitle(e.target.value)} autoFocus onBlur={updateBoardTitle} />
                        : <h3 id="board-title" onDoubleClick={() => setIsEditingTitle(true)}> {boardTitle} </h3>}
                </div>
                <div id="columns-wrapper">
                    {kanbanColumns && kanbanColumns.map(kanbanColumn => (
                        <div className="column-container" key={kanbanColumn.id}>
                            <Column title={kanbanColumn.title} cards={getCardsByColumn(kanbanColumn.id)}
                                setAllCards={setCards} columnId={kanbanColumn.id} restrictedKanbanColumns={kanbanColumn.restrictedKanbanColumns}
                                moveCard={moveCard} />
                        </div>
                    ))}
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