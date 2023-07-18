package com.example.resourceserver.controller;

import com.example.resourceserver.dto.KanbanColumnCreateRequest;
import com.example.resourceserver.dto.KanbanColumnDto;
import com.example.resourceserver.service.KanbanColumnService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/column")
public class KanbanColumnController {
    private KanbanColumnService kanbanColumnService;

    public KanbanColumnController(KanbanColumnService kanbanColumnService) {
        this.kanbanColumnService = kanbanColumnService;
    }

    @PostMapping
    public KanbanColumnDto saveKanbanColumn(@Valid @RequestBody KanbanColumnCreateRequest kanbanColumnCreateReq) {
        return kanbanColumnService.saveKanbanColumn(kanbanColumnCreateReq);
    }


    public KanbanColumnService getKanbanColumnService() {
        return kanbanColumnService;
    }

    public void setKanbanColumnService(KanbanColumnService kanbanColumnService) {
        this.kanbanColumnService = kanbanColumnService;
    }
}
