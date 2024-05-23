package com.example.resourceserver.model;

import com.example.resourceserver.listener.CardListener;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Entity
@EntityListeners(CardListener.class)
public class Card extends BaseModel {
    private String title;
    @OneToMany(mappedBy = "card", cascade = CascadeType.REMOVE)
    private List<Note> notes;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JsonIgnore
    private KanbanColumn kanbanColumn;
    private int index=0;
    private int difficulty;
    private int priority;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private Date date;
    @ManyToOne(fetch = FetchType.LAZY)
    private Card parentCard;
    @OneToMany(mappedBy = "parentCard", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Card> subCards;

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

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public KanbanColumn getKanbanColumn() {
        return kanbanColumn;
    }

    public void setKanbanColumn(KanbanColumn kanbanColumn) {
        this.kanbanColumn = kanbanColumn;
    }

    public int getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(int difficulty) {
        this.difficulty = difficulty;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Card getParentCard() {
        return parentCard;
    }

    public void setParentCard(Card parentCard) {
        this.parentCard = parentCard;
    }

    public List<Card> getSubCards() {
        return subCards;
    }

    public void setSubCards(List<Card> subCards) {
        this.subCards = subCards;
    }
}
