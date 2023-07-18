package com.example.resourceserver.controller;

import com.example.resourceserver.dto.KanbanColumnCreateRequest;
import com.example.resourceserver.dto.KanbanColumnDto;
import com.example.resourceserver.service.KanbanColumnService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public List<KanbanColumnDto> getAllKanbanColumns() {
        return kanbanColumnService.getAllKanbanColumns();
    }

    @DeleteMapping
    public String deleteKanbanColumnById(@RequestParam @Valid @NotNull Long id) {
        kanbanColumnService.deleteByKanbanColumnId(id);
        return "Successfully Deleted";
    }


    public KanbanColumnService getKanbanColumnService() {
        return kanbanColumnService;
    }

    public void setKanbanColumnService(KanbanColumnService kanbanColumnService) {
        this.kanbanColumnService = kanbanColumnService;
    }
}
