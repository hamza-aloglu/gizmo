package com.example.resourceserver.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class KanbanColumn extends BaseModel {
    private String title;
    @OneToMany(mappedBy = "kanbanColumn", cascade = CascadeType.REMOVE)
    private List<Card> cards;
    @ManyToOne
    @JsonIgnore
    private Board board;

    public KanbanColumn() {

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

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }
}
