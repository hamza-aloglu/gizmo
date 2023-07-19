package com.example.resourceserver.dto;

import jakarta.validation.constraints.NotNull;

public class KanbanColumnCreateRequest {
    private String title;
    @NotNull
    private Long boardId;

    public KanbanColumnCreateRequest() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getBoardId() {
        return boardId;
    }

    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }
}
