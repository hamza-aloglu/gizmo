package com.example.resourceserver.dto;
import java.util.Collections;
import java.util.List;

public class KanbanColumnDto {
    private Long id;
    private String title;

    public KanbanColumnDto() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
