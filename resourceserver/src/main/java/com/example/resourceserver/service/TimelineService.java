package com.example.resourceserver.service;

import com.example.resourceserver.dto.TimelineCreateRequest;
import com.example.resourceserver.exception.NotFoundException;
import com.example.resourceserver.model.Timeline;
import com.example.resourceserver.repository.TimelineRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TimelineService {
    private final TimelineRepository timelineRepository;

    public TimelineService(TimelineRepository timelineRepository) {
        this.timelineRepository = timelineRepository;
    }

    public void createTimeline(TimelineCreateRequest timelineCreateRequest) {
        Timeline timeline = new Timeline();
        timeline.setTitle(timelineCreateRequest.getTitle());
        timeline.setUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        timelineRepository.save(timeline);
    }

    protected Timeline get(Long timelineId) {
        Optional<Timeline> timelineOptional = timelineRepository.findById(timelineId);
        if (timelineOptional.isEmpty()) {
            throw new NotFoundException("Timeline Not found with id: " + timelineId);
        }
        return timelineOptional.get();
    }
}
