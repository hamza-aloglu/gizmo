import { useState } from "react";
import Column from "./Column";
import KanbanService from "../../services/KanbanService";
import "../../css/kanban/Board.css";

const Board = ({ title, kanbanColumnsResponse, boardId }) => {
    const [kanbanColumns, setKanbanColumns] = useState(kanbanColumnsResponse);
    const [isFormActive, setIsFormActive] = useState(false);
    const [newColumnTitle, setNewColumnTitle] = useState("");

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

    return (
        <div className="board-wrapper">
            <div id="board-title-wrapper">
                <h3 id="board-title"> {title} </h3>
            </div>
            <div id="columns-wrapper">
                {kanbanColumns && kanbanColumns.map(kanbanColumn => (
                    <div className="column-container">
                        <div key={kanbanColumn.title}>
                            <Column title={kanbanColumn.title} cardsResponse={kanbanColumn.cards} columnId={kanbanColumn.id} />
                        </div>
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
    )
}

export default Board;