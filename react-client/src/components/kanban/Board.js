import { useState } from "react";
import Column from "./Column";
import KanbanService from "../../services/KanbanService";

const Board = ({ title, kanbanColumnsResponse, boardId }) => {
    const [kanbanColumns, setKanbanColumns] = useState(kanbanColumnsResponse);
    const [isFormActive, setIsFormActive] = useState(false);
    const [newColumnTitle, setNewColumnTitle] = useState("");

    function handleCreateColumn(e) {
        e.preventDefault();
        KanbanService.createColumn(newColumnTitle, boardId).then(async (response) => {
            const column = await response.json();
            if(response.ok) {
                const newKanbanColumns = [column];
                if(kanbanColumns != null) {
                    newKanbanColumns.push(...kanbanColumns);
                }
                setKanbanColumns(newKanbanColumns);
            }
        });
        setIsFormActive(false);
    }

    return (
        <div>
            <h2 style={{textAlign: "center", margin: "10px"}}> {title} </h2>
            {kanbanColumns && kanbanColumns.map(kanbanColumn => (
                <div key={kanbanColumn.title} style={{
                    display: "inline-block",
                    width: "20%"
                }}>
                    <Column title={kanbanColumn.title} cardsResponse={kanbanColumn.cards} columnId={kanbanColumn.id} />
                </div>
            ))}
            {!isFormActive && <button onClick={() => setIsFormActive(true)}> Create Column </button>}
            {isFormActive && <form style={{display: "inline-block"}} onSubmit={handleCreateColumn}>
                <input type="text" onChange={(e) => setNewColumnTitle(e.target.value)} />
            </form> }
        </div>
    )
}

export default Board;