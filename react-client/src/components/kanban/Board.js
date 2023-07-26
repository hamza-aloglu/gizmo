import { useEffect, useState } from "react";
import Column from "./Column";
import KanbanService from "../../services/KanbanService";
import "../../css/kanban/Board.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Board = ({ title, boardId }) => {
    const [kanbanColumns, setKanbanColumns] = useState([]);
    const [cards, setCards] = useState([]);
    const [isFormActive, setIsFormActive] = useState(false);
    const [newColumnTitle, setNewColumnTitle] = useState("");

    useEffect( () => {
        KanbanService.getColumns(boardId).then(async (response) => {
            const columns = await response.json();
            setKanbanColumns(columns);
        });

        KanbanService.getCardsByBoard(boardId).then(async(response) => {
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

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="board-wrapper">
                <div id="board-title-wrapper">
                    <h3 id="board-title"> {title} </h3>
                </div>
                <div id="columns-wrapper">
                    {kanbanColumns && kanbanColumns.map(kanbanColumn => (
                        <div className="column-container" key={kanbanColumn.id}>
                            <Column title={kanbanColumn.title} cards={getCardsByColumn(kanbanColumn.id)}
                             setAllCards={setCards} columnId={kanbanColumn.id} restrictedKanbanColumns={kanbanColumn.restrictedKanbanColumns} />
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