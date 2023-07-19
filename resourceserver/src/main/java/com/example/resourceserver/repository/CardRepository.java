package com.example.resourceserver.repository;

import com.example.resourceserver.model.Card;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends ListCrudRepository<Card, Long> {
    Card getCardById(Long id);
    List<Card> getCardByMasterCardId(Long masterCardId);
    List<Card> findAllByKanbanColumn_Id(Long kanbanColumnId);
}
