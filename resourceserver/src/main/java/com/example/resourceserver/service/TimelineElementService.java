package com.example.resourceserver.service;

import com.example.resourceserver.repository.TimelineElementRepository;
import org.springframework.stereotype.Service;

@Service
public class TimelineElementService {
    private TimelineElementRepository timelineElementRepository;

    public TimelineElementService(TimelineElementRepository timelineElementRepository) {
        this.timelineElementRepository = timelineElementRepository;
    }
}
