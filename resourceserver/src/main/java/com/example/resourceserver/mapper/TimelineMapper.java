package com.example.resourceserver.mapper;

import com.example.resourceserver.dto.TimelineDto;
import com.example.resourceserver.model.Timeline;
import org.mapstruct.Mapper;

@Mapper
public interface TimelineMapper {
    TimelineDto timelineToTimelineDto(Timeline timeline);
}
