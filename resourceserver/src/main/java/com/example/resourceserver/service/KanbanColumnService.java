package com.example.resourceserver.service;

import com.example.resourceserver.dto.KanbanColumnCreateRequest;
import com.example.resourceserver.dto.KanbanColumnDto;
import com.example.resourceserver.exception.NotFoundException;
import com.example.resourceserver.mapper.KanbanColumnMapper;
import com.example.resourceserver.model.KanbanColumn;
import com.example.resourceserver.repository.KanbanColumnRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KanbanColumnService {
    private KanbanColumnRepository kanbanColumnRepository;
    KanbanColumnMapper kanbanColumnMapper = Mappers.getMapper(KanbanColumnMapper.class);

    public KanbanColumnService(KanbanColumnRepository kanbanColumnRepository) {
        this.kanbanColumnRepository = kanbanColumnRepository;
    }

    public KanbanColumnDto saveKanbanColumn(KanbanColumnCreateRequest kanbanColumnCreateRequest) {
        KanbanColumn kanbanColumn = kanbanColumnMapper.
                kanbanColumnCreateRequestToKanbanColumn(kanbanColumnCreateRequest);

        kanbanColumnRepository.save(kanbanColumn);
        return kanbanColumnMapper.kanbanColumnToKanbanColumnDto(kanbanColumn);
    }

    public List<KanbanColumnDto> getAllKanbanColumns() {
        return kanbanColumnMapper.listKanbanColumnToListKanbanColumnDto(kanbanColumnRepository.findAll());
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
}
