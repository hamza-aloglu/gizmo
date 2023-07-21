import { useState } from "react";
import Column from "./Column";

const Board = ({ title, kanbanColumnsResponse }) => {
    const [kanbanColumns, setKanbanColumns] = useState(kanbanColumnsResponse);

    return (
        <div>
            <h2> {title} </h2>
            {kanbanColumns && kanbanColumns.map(kanbanColumn => (
                <div key={kanbanColumn.title}>
                    <Column title={kanbanColumn.title} cardsResponse={kanbanColumn.cards} />
                </div>
            ))}
        </div>
    )
}

export default Board;