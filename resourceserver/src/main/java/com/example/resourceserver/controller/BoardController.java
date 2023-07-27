package com.example.resourceserver.controller;

import com.example.resourceserver.dto.BoardCreateRequest;
import com.example.resourceserver.dto.BoardDto;
import com.example.resourceserver.service.BoardService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/boards")
public class BoardController {
    private BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @PostMapping
    public BoardDto saveBoard(@Valid @RequestBody BoardCreateRequest boardCreateRequest) {
        return boardService.saveBoard(boardCreateRequest);
    }

    @GetMapping
    public List<BoardDto> findAllBoardsByUser() {
        return boardService.getAllBoardsByUser();
    }

    @GetMapping("/{boardId}")
    public BoardDto getBoard(@Valid @NotNull @PathVariable Long boardId) {
        return boardService.getBoardDto(boardId);
    }

    @DeleteMapping
    public String deleteBoard(@Valid @NotNull @RequestParam Long boardId) {
        boardService.deleteByBoardId(boardId);
        return "Successfully deleted";
    }

    @PutMapping("/title")
    public String updateBoardTitle(@Valid @NotNull @RequestParam String title, @Valid @NotNull @RequestParam Long boardId) {
        boardService.updateBoardTitle(title, boardId);
        return "heoheoheoheoe";
    }

    public BoardService getBoardService() {
        return boardService;
    }

    public void setBoardService(BoardService boardService) {
        this.boardService = boardService;
    }
}
