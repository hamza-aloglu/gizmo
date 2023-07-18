package com.example.resourceserver.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class KanbanColumn extends BaseModel {
    private String title;
    @OneToMany(mappedBy = "kanbanColumn", cascade = CascadeType.REMOVE)
    private List<Card> cards;

    //THİS İS MANY TO MANY
    @ManyToMany
    @JoinTable(name = "restrictedAndRestrictedByKanbanColumns", inverseJoinColumns = @JoinColumn(name = "restrictedId"),
            joinColumns = @JoinColumn(name = "restrictedById"))
    private List<KanbanColumn> restrictedKanbanColumns;
    @ManyToMany
    @JoinTable(name = "restrictedAndRestrictedByKanbanColumns", inverseJoinColumns = @JoinColumn(name = "restrictedById"),
            joinColumns = @JoinColumn(name = "restrictedId"))
    private List<KanbanColumn> restrictedByKanbanColumns;

    public KanbanColumn() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    public List<KanbanColumn> getRestrictedKanbanColumns() {
        return restrictedKanbanColumns;
    }

    public void setRestrictedKanbanColumns(List<KanbanColumn> restrictedKanbanColumns) {
        this.restrictedKanbanColumns = restrictedKanbanColumns;
    }

    public List<KanbanColumn> getRestrictedByKanbanColumns() {
        return restrictedByKanbanColumns;
    }

    public void setRestrictedByKanbanColumns(List<KanbanColumn> restrictedByKanbanColumns) {
        this.restrictedByKanbanColumns = restrictedByKanbanColumns;
    }
}
