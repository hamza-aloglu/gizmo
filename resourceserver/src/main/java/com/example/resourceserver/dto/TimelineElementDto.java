package com.example.resourceserver.dto;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class TimelineElementDto {
    private Long id;
    private String title;
    private String subtitle;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private String description;
    private BoardDto board;

    public TimelineElementDto() {
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

    public BoardDto getBoard() {
        return board;
    }

    public void setBoard(BoardDto board) {
        this.board = board;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
