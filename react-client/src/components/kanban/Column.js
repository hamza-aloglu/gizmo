import { useState } from "react";
import Card from "./Card";
import KanbanService from "../../services/KanbanService";
import '../../css/kanban/Column.css';

const Column = ({ title, cardsResponse, columnId }) => {
    const [cards, setCards] = useState(cardsResponse);
    const [isFormActive, setIsFormActive] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState("");

    function handleCreateCard(e) {
        e.preventDefault();
        KanbanService.createCard(newCardTitle, columnId).then(async (response) => {
            const card = await response.json();
            if (response.ok) {
                const newCards = []
                if (cards != null) {
                    newCards.push(...cards);
                }
                newCards.push(card);
                setCards(newCards);
            }
        });
        setIsFormActive(false);
    }

    return (
        <div className="column-wrapper">
            <h4 className="column-title"> {title} </h4>
            <hr />
            {cards && cards.map(card => (
                <div key={card.title}>
                    <Card title={card.title} notesResponse={card.notes} index={card.index} cardId={card.id} />
                </div>
            ))}
            <div className="create-card-container">
                {!isFormActive && <button className="long-button" onClick={() => setIsFormActive(true)}> Create Card </button>}
                {isFormActive && <form onSubmit={handleCreateCard}>
                    <input className="long-input" type="text" onChange={(e) => setNewCardTitle(e.target.value)} />
                </form>}
            </div>
        </div>
    )
}

export default Column;