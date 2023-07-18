package com.example.resourceserver.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class KanbanColumn extends BaseModel {
    private String title;
    @OneToMany(mappedBy = "kanbanColumn", cascade = CascadeType.REMOVE)
    List<Card> cards;

    public KanbanColumn() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
