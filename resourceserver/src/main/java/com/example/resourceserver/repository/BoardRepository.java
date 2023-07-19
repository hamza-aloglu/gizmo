package com.example.resourceserver.repository;

import com.example.resourceserver.model.Board;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends ListCrudRepository<Board, Long> {
    Board getBoardById(Long boardId);
    List<Board> findAllByUsername(String username);
}
