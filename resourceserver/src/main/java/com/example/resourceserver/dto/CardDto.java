package com.example.resourceserver.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class CardDto {
    private Long id;
    private String title;
    private List<NoteDto> notes;
    private int index;

    @JsonProperty("setForTomorrow")
    private boolean willUpdateTomorrow;

    private KanbanColumnDto kanbanColumn;

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
}
