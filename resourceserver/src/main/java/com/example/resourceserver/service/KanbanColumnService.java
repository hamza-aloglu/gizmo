package com.example.resourceserver.service;

import com.example.resourceserver.dto.KanbanColumnCreateRequest;
import com.example.resourceserver.dto.KanbanColumnDto;
import com.example.resourceserver.exception.NotFoundException;
import com.example.resourceserver.mapper.KanbanColumnMapper;
import com.example.resourceserver.model.Board;
import com.example.resourceserver.model.KanbanColumn;
import com.example.resourceserver.repository.KanbanColumnRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class KanbanColumnService {
    private KanbanColumnRepository kanbanColumnRepository;
    KanbanColumnMapper kanbanColumnMapper = Mappers.getMapper(KanbanColumnMapper.class);
    private BoardService boardService;

    public KanbanColumnService(KanbanColumnRepository kanbanColumnRepository, BoardService boardService) {
        this.kanbanColumnRepository = kanbanColumnRepository;
        this.boardService = boardService;
    }

    public KanbanColumnDto saveKanbanColumn(KanbanColumnCreateRequest kanbanColumnCreateRequest) {
        KanbanColumn kanbanColumn = kanbanColumnMapper.
                kanbanColumnCreateRequestToKanbanColumn(kanbanColumnCreateRequest);

        Long boardId = kanbanColumnCreateRequest.getBoardId();
        if (!boardService.isBoardExists(boardId)) {
            throw new NotFoundException("Board not found with id : " + boardId);
        }
        Board board = boardService.getBoard(boardId);
        kanbanColumn.setBoard(board);

        kanbanColumnRepository.save(kanbanColumn);
        return kanbanColumnMapper.kanbanColumnToKanbanColumnDto(kanbanColumn);
    }

    public KanbanColumnDto addRestrictedKanbanColumns(List<Long> restrictedKanbanColumnIds, Long kanbanColumnId) {
        if (!kanbanColumnRepository.existsById(kanbanColumnId)) {
            throw new NotFoundException("KanbanColumn does not exists with id: " + kanbanColumnId);
        }
        KanbanColumn kanbanColumn = kanbanColumnRepository.getKanbanColumnById(kanbanColumnId);

        List<KanbanColumn> restrictedKanbanColumns = new ArrayList<>();
        restrictedKanbanColumnIds.forEach((id) -> {
            if (!kanbanColumnRepository.existsById(id)) {
                throw new NotFoundException("KanbanColumn does not exists with id: " + kanbanColumnId + " in the list");
            }
            restrictedKanbanColumns.add(kanbanColumnRepository.getKanbanColumnById(id));
        });

        kanbanColumn.setRestrictedKanbanColumns(restrictedKanbanColumns);
        KanbanColumn savedKanbanColumn = kanbanColumnRepository.save(kanbanColumn);
        return kanbanColumnMapper.kanbanColumnToKanbanColumnDto(savedKanbanColumn);
    }

    public List<KanbanColumnDto> getAllKanbanColumns(Long boardId) {
        if (!getBoardService().isBoardExists(boardId)) {
            throw new NotFoundException("Board not found with id: " + boardId);
        }

        return kanbanColumnMapper.listKanbanColumnToListKanbanColumnDto(
                kanbanColumnRepository.findAllByBoard_Id(boardId)
        );
    }

    public void deleteByKanbanColumnId(Long id) {
        if (!kanbanColumnRepository.existsById(id)) {
            throw new NotFoundException("KanbanColumn not found with id: " + id);
        }

        kanbanColumnRepository.deleteById(id);
    }

    protected boolean isKanbanColumnExistsById(Long id) {
        return kanbanColumnRepository.existsById(id);
    }

    protected KanbanColumn getKanbanColumnById(Long id) {
        return kanbanColumnRepository.getKanbanColumnById(id);
    }


    public KanbanColumnRepository getKanbanColumnRepository() {
        return kanbanColumnRepository;
    }

    public void setKanbanColumnRepository(KanbanColumnRepository kanbanColumnRepository) {
        this.kanbanColumnRepository = kanbanColumnRepository;
    }

    public BoardService getBoardService() {
        return boardService;
    }

    public void setBoardService(BoardService boardService) {
        this.boardService = boardService;
    }
}
