package com.example.resourceserver.controller;

import com.example.resourceserver.dto.KanbanColumnCreateRequest;
import com.example.resourceserver.dto.KanbanColumnDto;
import com.example.resourceserver.service.KanbanColumnService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/columns")
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
    public List<KanbanColumnDto> getAllKanbanColumns(@Valid @NotNull @RequestParam Long boardId) {
        return kanbanColumnService.getAllKanbanColumns(boardId);
    }

    @DeleteMapping
    public String deleteKanbanColumnById(@RequestParam @Valid @NotNull Long id) {
        kanbanColumnService.deleteByKanbanColumnId(id);
        return "Successfully Deleted";
    }

    @PutMapping("/title")
    public String updateKanbanColumnTitle(@Valid @NotNull @RequestParam String title,
                                          @Valid @NotNull @RequestParam Long id) {
        kanbanColumnService.updateKanbanColumnTitle(title, id);
        return "successfully updated title";
    }


    public KanbanColumnService getKanbanColumnService() {
        return kanbanColumnService;
    }

    public void setKanbanColumnService(KanbanColumnService kanbanColumnService) {
        this.kanbanColumnService = kanbanColumnService;
    }
}
