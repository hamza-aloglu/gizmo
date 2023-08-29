package com.example.resourceserver.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
public class Timeline extends BaseModel {
    private String title;
    @NotNull
    private String username;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
