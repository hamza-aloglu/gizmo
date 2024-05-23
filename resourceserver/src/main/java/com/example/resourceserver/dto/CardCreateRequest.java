package com.example.resourceserver.dto;

import com.example.resourceserver.model.Card;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class CardCreateRequest {
    private String title;
    @NotNull
    private Long kanbanColumnId;
    private int difficulty;
    private int priority;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private Long parentCardId;

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

    public Long getParentCardId() {
        return parentCardId;
    }

    public void setParentCardId(Long parentCardId) {
        this.parentCardId = parentCardId;
    }
}
