package com.example.resourceserver.controller;

import com.example.resourceserver.dto.TimelineCreateRequest;
import com.example.resourceserver.service.TimelineService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
