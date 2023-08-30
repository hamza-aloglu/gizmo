package com.example.resourceserver.dto;

import com.example.resourceserver.model.TimelineElement;

import java.util.List;

public class TimelineDto {
    private Long id;
    private String title;
    private List<TimelineElementDto> timelineElements;

    public TimelineDto() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<TimelineElementDto> getTimelineElements() {
        return timelineElements;
    }

    public void setTimelineElements(List<TimelineElementDto> timelineElements) {
        this.timelineElements = timelineElements;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
