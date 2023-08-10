package com.example.resourceserver.model;

import com.example.resourceserver.listener.BoardListener;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.core.userdetails.User;

import java.util.List;

@Entity
@EntityListeners(BoardListener.class)
public class Board extends BaseModel {
    private String title;
    @NotNull
    private String username;
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<KanbanColumn> kanbanColumns;

    public Board() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<KanbanColumn> getKanbanColumns() {
        return kanbanColumns;
    }

    public void setKanbanColumns(List<KanbanColumn> kanbanColumns) {
        this.kanbanColumns = kanbanColumns;
    }
}
