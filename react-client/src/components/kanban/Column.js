import { useState } from "react";
import Card from "./Card";
import KanbanService from "../../services/KanbanService";

const Column = ({ title, cardsResponse, columnId }) => {
    const [cards, setCards] = useState(cardsResponse);
    const [isFormActive, setIsFormActive] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState("");

    function handleCreateCard(e) {
        e.preventDefault();
        KanbanService.createCard(newCardTitle, columnId).then(async (response) => {
            const card = await response.json();
            if(response.ok) {
                const newCards = [card];
                if(cards != null) {
                    newCards.push(...cards);
                }
                setCards(newCards);
            }
        });
        setIsFormActive(false);
    }

    return (
        <div>
            <h3> {title} </h3>
            <hr />
            {cards && cards.map(card => (
                <div key={card.title}>
                    <Card title={card.title} notesResponse={card.notes} index={card.index} cardId={card.id} />
                </div>
            ))}
            {!isFormActive && <button onClick={() => setIsFormActive(true)}> Create Card </button>}
            {isFormActive && <form style={{display: "inline-block"}} onSubmit={handleCreateCard}>
                <input type="text" onChange={(e) => setNewCardTitle(e.target.value)} />
            </form> }
        </div>
    )
}

export default Column;