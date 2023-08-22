package com.example.resourceserver.dto;

import jakarta.validation.constraints.NotNull;

public class CardCreateRequest {
    private String title;
    @NotNull
    private Long kanbanColumnId;

    public CardCreateRequest() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getKanbanColumnId() {
        return kanbanColumnId;
    }

    public void setKanbanColumnId(Long kanbanColumnId) {
        this.kanbanColumnId = kanbanColumnId;
    }
}
