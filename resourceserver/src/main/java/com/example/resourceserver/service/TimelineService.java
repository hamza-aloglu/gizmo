package com.example.resourceserver.service;

import com.example.resourceserver.dto.TimelineCreateRequest;
import com.example.resourceserver.dto.TimelineDto;
import com.example.resourceserver.exception.NotFoundException;
import com.example.resourceserver.mapper.TimelineMapper;
import com.example.resourceserver.model.Timeline;
import com.example.resourceserver.repository.TimelineRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TimelineService {
    private final TimelineRepository timelineRepository;
    private final TimelineMapper timelineMapper = Mappers.getMapper(TimelineMapper.class);

    public TimelineService(TimelineRepository timelineRepository) {
        this.timelineRepository = timelineRepository;
    }

    public TimelineDto createTimeline(TimelineCreateRequest timelineCreateRequest) {
        Timeline timeline = new Timeline();
        timeline.setTitle(timelineCreateRequest.getTitle());
        timeline.setUsername(SecurityContextHolder.getContext().getAuthentication().getName());

        Timeline savedTimeline = timelineRepository.save(timeline);
        return timelineMapper.timelineToTimelineDto(savedTimeline);
    }

    protected Timeline get(Long timelineId) {
        Optional<Timeline> timelineOptional = timelineRepository.findById(timelineId);
        if (timelineOptional.isEmpty()) {
            throw new NotFoundException("Timeline Not found with id: " + timelineId);
        }
        return timelineOptional.get();
    }

    public TimelineDto getTimeline(Long timelineId) {
        Timeline timeline = this.get(timelineId);
        return timelineMapper.timelineToTimelineDto(timeline);
    }

    public void deleteTimeline(Long timelineId) {
        if (!timelineRepository.existsById(timelineId)) {
            throw new NotFoundException("Timeline not found with id: " + timelineId);
        }
        timelineRepository.deleteById(timelineId);
    }

    public void updateTitle(Long id, String title) {
        Timeline timeline = this.get(id);
        timeline.setTitle(title);
        timelineRepository.save(timeline);
    }
}
