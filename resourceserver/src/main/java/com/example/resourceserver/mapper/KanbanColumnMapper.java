package com.example.resourceserver.mapper;

import com.example.resourceserver.dto.KanbanColumnCreateRequest;
import com.example.resourceserver.dto.KanbanColumnDto;
import com.example.resourceserver.model.KanbanColumn;
import org.mapstruct.Mapper;

@Mapper
public interface KanbanColumnMapper {
    KanbanColumnDto kanbanColumnToKanbanColumnDto(KanbanColumn kanbanColumn);
    KanbanColumn kanbanColumnCreateRequestToKanbanColumn(KanbanColumnCreateRequest kanbanColumnCreateRequest);
}
