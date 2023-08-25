package com.example.resourceserver.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Timeline extends BaseModel {
    private String title;

    @OneToMany(mappedBy = "timeline", cascade = CascadeType.REMOVE)
    private List<TimelineElement> timelineElements;

    public Timeline() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<TimelineElement> getTimelineElements() {
        return timelineElements;
    }

    public void setTimelineElements(List<TimelineElement> timelineElements) {
        this.timelineElements = timelineElements;
    }
}
