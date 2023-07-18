package com.example.resourceserver.dto;

import com.example.resourceserver.model.Card;

import java.util.List;

public class KanbanColumnDto {
    private String title;
    private List<Card> cards;

    public KanbanColumnDto() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }
}
