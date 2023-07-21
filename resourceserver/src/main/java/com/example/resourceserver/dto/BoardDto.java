package com.example.resourceserver.dto;

import com.example.resourceserver.model.KanbanColumn;

import java.util.List;

public class BoardDto {
    private Long id;
    private String title;
    private List<KanbanColumnDto> kanbanColumns;

    public BoardDto() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<KanbanColumnDto> getKanbanColumns() {
        return kanbanColumns;
    }

    public void setKanbanColumns(List<KanbanColumnDto> kanbanColumns) {
        this.kanbanColumns = kanbanColumns;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
