package com.example.resourceserver.controller;

import com.example.resourceserver.service.TimelineElementService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/timelineelements")
public class TimelineElementController {
    private TimelineElementService timelineElementService;

    public TimelineElementController(TimelineElementService timelineElementService) {
        this.timelineElementService = timelineElementService;
    }
}
