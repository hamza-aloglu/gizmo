package com.example.resourceserver.dto;

import java.util.List;

public class CardDto {
    private Long id;
    private String title;
    private List<NoteDto> notes;
    private CardDto masterCard;
    private int index;
    private boolean isSetForTomorrow;

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

    public CardDto getMasterCard() {
        return masterCard;
    }

    public void setMasterCard(CardDto masterCard) {
        this.masterCard = masterCard;
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

    public boolean isSetForTomorrow() {
        return isSetForTomorrow;
    }

    public void setSetForTomorrow(boolean setForTomorrow) {
        isSetForTomorrow = setForTomorrow;
    }
}
