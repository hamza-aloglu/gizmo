package com.example.resourceserver.dto;

import com.example.resourceserver.model.Card;

import java.util.List;

public class CardDto {
    private Long id;
    private String title;
    private List<NoteDto> notes;
    private Card masterCard;
    private int index;

    public CardDto() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<NoteDto> getNotes() {
        return notes;
    }

    public void setNotes(List<NoteDto> notes) {
        this.notes = notes;
    }

    public Card getMasterCard() {
        return masterCard;
    }

    public void setMasterCard(Card masterCard) {
        this.masterCard = masterCard;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }
}
