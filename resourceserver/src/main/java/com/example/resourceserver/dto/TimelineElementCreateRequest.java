package com.example.resourceserver.dto;

import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class TimelineElementCreateRequest {
    private String title;
    private String subtitle;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private String description;
    @NotNull
    private Long timelineId;
    private Long boardId;

    public TimelineElementCreateRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getTimelineId() {
        return timelineId;
    }

    public void setTimelineId(Long timelineId) {
        this.timelineId = timelineId;
    }

    public Long getBoardId() {
        return boardId;
    }

    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }
}
