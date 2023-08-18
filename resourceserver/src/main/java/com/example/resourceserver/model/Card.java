package com.example.resourceserver.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Card extends BaseModel {
    private String title;
    @OneToMany(mappedBy = "card", cascade = CascadeType.REMOVE)
    private List<Note> notes;
    @ManyToOne
    private Card masterCard;
    @OneToMany(mappedBy = "masterCard", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Card> slaveCards;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JsonIgnore
    private KanbanColumn kanbanColumn;
    private boolean isSetForTomorrow = false;
    private int index=0;

    public Card() {

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

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public List<Card> getSlaveCards() {
        return slaveCards;
    }

    public void setSlaveCards(List<Card> slaveCards) {
        this.slaveCards = slaveCards;
    }

    public KanbanColumn getKanbanColumn() {
        return kanbanColumn;
    }

    public void setKanbanColumn(KanbanColumn kanbanColumn) {
        this.kanbanColumn = kanbanColumn;
    }

    public boolean isSetForTomorrow() {
        return isSetForTomorrow;
    }

    public void setSetForTomorrow(boolean setForTomorrow) {
        isSetForTomorrow = setForTomorrow;
    }
}
