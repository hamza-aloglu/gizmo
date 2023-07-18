package com.example.resourceserver.repository;

import com.example.resourceserver.model.KanbanColumn;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KanbanColumnRepository extends ListCrudRepository<KanbanColumn, Long> {
}
