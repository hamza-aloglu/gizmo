package com.example.resourceserver.mapper;

import com.example.resourceserver.dto.TimelineElementCreateRequest;
import com.example.resourceserver.dto.TimelineElementDto;
import com.example.resourceserver.model.TimelineElement;
import org.mapstruct.Mapper;

@Mapper
public interface TimelineElementMapper {
    TimelineElement timelineElementCreateRequestToTimelineElement(TimelineElementCreateRequest req);
    TimelineElementDto timelineElementToTimelineElementDto(TimelineElement te);
}
