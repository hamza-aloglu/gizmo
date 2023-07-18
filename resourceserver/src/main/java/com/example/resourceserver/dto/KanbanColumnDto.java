package com.example.resourceserver.dto;


import java.util.List;

public class KanbanColumnDto {
    private Long id;
    private String title;
    private List<CardDto> cards;

    public KanbanColumnDto() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<CardDto> getCards() {
        return cards;
    }

    public void setCards(List<CardDto> cards) {
        this.cards = cards;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
