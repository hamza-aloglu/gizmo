package com.example.resourceserver.controller;

import com.example.resourceserver.dto.TimelineElementCreateRequest;
import com.example.resourceserver.dto.TimelineElementDto;
import com.example.resourceserver.service.TimelineElementService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/timelineelements")
public class TimelineElementController {
    private TimelineElementService timelineElementService;

    public TimelineElementController(TimelineElementService timelineElementService) {
        this.timelineElementService = timelineElementService;
    }

    @PostMapping
    public TimelineElementDto createTimelineElement(@Valid @RequestBody TimelineElementCreateRequest req) {
        return timelineElementService.createTimelineElement(req);
    }
}
