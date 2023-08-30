package com.example.resourceserver.controller;

import com.example.resourceserver.dto.TimelineElementCreateRequest;
import com.example.resourceserver.dto.TimelineElementDto;
import com.example.resourceserver.service.TimelineElementService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping(value = "/timelineelements")
public class TimelineElementController {
    private final TimelineElementService timelineElementService;

    public TimelineElementController(TimelineElementService timelineElementService) {
        this.timelineElementService = timelineElementService;
    }

    @PostMapping
    public TimelineElementDto createTimelineElement(@Valid @RequestBody TimelineElementCreateRequest req) {
        return timelineElementService.createTimelineElement(req);
    }

    @DeleteMapping
    public void deleteTimelineElement(@RequestParam @Valid @NotNull Long id) {
        timelineElementService.deleteTimelineElement(id);
    }

    @PutMapping("/title")
    public void updateTitle(@RequestParam @Valid @NotNull Long id,
                            @RequestParam @Valid @NotNull String title) {
        timelineElementService.updateTitle(id, title);
    }

    @PutMapping("/subtitle")
    public void updateSubtitle(@RequestParam @Valid @NotNull Long id,
                            @RequestParam @Valid @NotNull String subtitle) {
        timelineElementService.updateSubtitle(id, subtitle);
    }

    @PutMapping("/date")
    public void updateDate(@RequestParam @Valid @NotNull Long id,
                            @RequestParam @Valid @NotNull @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        timelineElementService.updateDate(id, date);
    }

    @PutMapping("/desc")
    public void updateDescription(@RequestParam @Valid @NotNull Long id,
                            @RequestParam @Valid @NotNull String desc) {
        timelineElementService.updateDesc(id, desc);
    }

    @PutMapping("/board")
    public void updateTitle(@RequestParam @Valid @NotNull Long id,
                            @RequestParam @Valid @NotNull Long boardId) {
        timelineElementService.updateBoard(id, boardId);
    }

}
