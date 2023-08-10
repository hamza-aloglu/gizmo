package com.example.resourceserver.listener;

import com.example.resourceserver.model.Board;
import com.example.resourceserver.model.KanbanColumn;
import jakarta.persistence.PrePersist;

import java.util.ArrayList;
import java.util.List;

public class BoardListener {
    private final String[] defaultColNames = {"Chunk", "Todo", "Doing", "Done"};

    @PrePersist
    public void createDefaultCols(Board board) {
        List<KanbanColumn> defaultCols = new ArrayList<>();

        for (String colName : defaultColNames) {
            KanbanColumn column = new KanbanColumn();
            column.setTitle(colName);
            column.setBoard(board);
            defaultCols.add(column);
        }
        board.setKanbanColumns(defaultCols);
    }
}
