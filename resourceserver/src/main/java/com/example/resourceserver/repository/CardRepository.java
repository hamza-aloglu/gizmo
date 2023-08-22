package com.example.resourceserver.repository;

import com.example.resourceserver.model.Card;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends ListCrudRepository<Card, Long> {
    Card getCardById(Long id);
    List<Card> findAllByKanbanColumn_Id(Long kanbanColumnId);

    @Query("select c from Card c join c.kanbanColumn k where k.board.id = ?1")
    List<Card> findAllCardsByBoardId(Long boardId);

    @Query("select c from Card c join c.kanbanColumn k where k.board.id = ?1 order by c.index")
    List<Card> findAllCardsByBoardIdAndOrderOrderByIndex(Long boardId);
}
