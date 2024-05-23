package com.example.resourceserver.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

public class CardDto {
    private Long id;
    private String title;
    private List<NoteDto> notes;
    private int index;
    @JsonProperty("setForTomorrow")
    private boolean willUpdateTomorrow;
    private KanbanColumnDto kanbanColumn;
    private int difficulty;
    private int priority;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private Date date;
    private CardDto parentCard;

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

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public KanbanColumnDto getKanbanColumn() {
        return kanbanColumn;
    }

    public void setKanbanColumn(KanbanColumnDto kanbanColumn) {
        this.kanbanColumn = kanbanColumn;
    }

    public boolean isWillUpdateTomorrow() {
        return willUpdateTomorrow;
    }

    public void setWillUpdateTomorrow(boolean willUpdateTomorrow) {
        this.willUpdateTomorrow = willUpdateTomorrow;
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

    public CardDto getParentCard() {
        return parentCard;
    }

    public void setParentCard(CardDto parentCard) {
        this.parentCard = parentCard;
    }
}
