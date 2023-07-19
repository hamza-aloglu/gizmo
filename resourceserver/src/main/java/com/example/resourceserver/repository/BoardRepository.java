package com.example.resourceserver.repository;

import com.example.resourceserver.model.Board;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends ListCrudRepository<Board, Long> {
    Board getBoardById(Long boardId);
}
