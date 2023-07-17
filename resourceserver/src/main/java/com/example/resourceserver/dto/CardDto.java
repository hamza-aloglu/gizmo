package com.example.resourceserver.dto;

import com.example.resourceserver.model.Card;
import com.example.resourceserver.model.Note;

import java.util.List;

public class CardDto {
    private Long id;
    private String title;
    private List<Note> notes;
    private Card masterCard;

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

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }

    public Card getMasterCard() {
        return masterCard;
    }

    public void setMasterCard(Card masterCard) {
        this.masterCard = masterCard;
    }
}
