package com.example.resourceserver.dto;

import jakarta.validation.constraints.NotNull;

public class CardCreateRequest {
    private String title;
    private Long masterCardId;
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

    public Long getMasterCardId() {
        return masterCardId;
    }

    public void setMasterCardId(Long masterCardId) {
        this.masterCardId = masterCardId;
    }

    public Long getKanbanColumnId() {
        return kanbanColumnId;
    }

    public void setKanbanColumnId(Long kanbanColumnId) {
        this.kanbanColumnId = kanbanColumnId;
    }
}
