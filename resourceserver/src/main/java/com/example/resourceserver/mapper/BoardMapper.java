package com.example.resourceserver.mapper;

import com.example.resourceserver.dto.BoardCreateRequest;
import com.example.resourceserver.dto.BoardDto;
import com.example.resourceserver.model.Board;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {
    Board boardCreateRequestToBoard(BoardCreateRequest boardCreateRequest);
    BoardDto boardToBoardDto(Board board);
    List<BoardDto> boardListToBoardDtoList(List<Board> boards);
}
