package com.example.resourceserver.controller;

import com.example.resourceserver.dto.TimelineCreateRequest;
import com.example.resourceserver.dto.TimelineDto;
import com.example.resourceserver.service.TimelineService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/timelines")
public class TimelineController {
    private TimelineService timelineService;

    public TimelineController(TimelineService timelineService) {
        this.timelineService = timelineService;
    }

    @PostMapping
    public void createTimeline(@Valid @RequestBody TimelineCreateRequest timelineCreateRequest) {
        timelineService.createTimeline(timelineCreateRequest);
    }

    @GetMapping("/{timelineId}")
    public TimelineDto getTimeline(@Valid @NotNull @PathVariable Long timelineId) {
        return timelineService.getTimeline(timelineId);
    }
}
