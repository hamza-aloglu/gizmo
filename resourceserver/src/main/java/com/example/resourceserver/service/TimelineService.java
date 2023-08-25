package com.example.resourceserver.service;

import com.example.resourceserver.repository.TimelineRepository;
import org.springframework.stereotype.Service;

@Service
public class TimelineService {
    private TimelineRepository timelineRepository;

    public TimelineService(TimelineRepository timelineRepository) {
        this.timelineRepository = timelineRepository;
    }
}
