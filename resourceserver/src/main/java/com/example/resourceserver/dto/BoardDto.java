package com.example.resourceserver.dto;

import com.example.resourceserver.model.KanbanColumn;

import java.util.List;

public class BoardDto {
    private String title;
    private List<KanbanColumn> kanbanColumns;

    public BoardDto() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<KanbanColumn> getKanbanColumns() {
        return kanbanColumns;
    }

    public void setKanbanColumns(List<KanbanColumn> kanbanColumns) {
        this.kanbanColumns = kanbanColumns;
    }
}
