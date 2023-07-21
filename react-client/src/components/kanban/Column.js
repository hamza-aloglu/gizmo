import { useState } from "react";
import Card from "./Card";

const Column = ({ title, cardsResponse }) => {
    const [cards, setCards] = useState(cardsResponse);

    return (
        <div>
            <h3> {title} </h3>
            {cards && cards.map(card => (
                <div key={card.title}>
                    <Card title={card.title} notesResponse={card.notes} index={card.index} />
                </div>
            ))}
        </div>
    )
}

export default Column;