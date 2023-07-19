package com.example.resourceserver.service;

import com.example.resourceserver.dto.BoardCreateRequest;
import com.example.resourceserver.dto.BoardDto;
import com.example.resourceserver.exception.NotFoundException;
import com.example.resourceserver.mapper.BoardMapper;
import com.example.resourceserver.model.Board;
import com.example.resourceserver.repository.BoardRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {
    private BoardRepository boardRepository;
    BoardMapper boardMapper = Mappers.getMapper(BoardMapper.class);

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public BoardDto saveBoard(BoardCreateRequest boardCreateRequest) {
        Board board = boardMapper.boardCreateRequestToBoard(boardCreateRequest);
        board.setUsername(SecurityContextHolder.getContext().getAuthentication().getName());

        Board savedBoard = boardRepository.save(board);
        return boardMapper.boardToBoardDto(savedBoard);
    }

    public List<BoardDto> getAllBoardsByUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        return boardMapper.boardListToBoardDtoList(boardRepository.findAllByUsername(username));
    }

    protected boolean isBoardExists(Long boardId) {
        return boardRepository.existsById(boardId);
    }


    public BoardRepository getBoardRepository() {
        return boardRepository;
    }

    public void setBoardRepository(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public Board getBoard(Long boardId) {
        return boardRepository.getBoardById(boardId);
    }

    public void deleteByBoardId(Long boardId) {
        if (!boardRepository.existsById(boardId)) {
            throw new NotFoundException("Board not found with id: " + boardId);
        }

        boardRepository.deleteById(boardId);
    }
}
