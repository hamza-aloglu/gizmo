package com.example.resourceserver.repository;

import com.example.resourceserver.model.KanbanColumn;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KanbanColumnRepository extends ListCrudRepository<KanbanColumn, Long> {
    KanbanColumn getKanbanColumnById(Long id);
    List<KanbanColumn> findAllByBoard_Id(Long boardId);
}
