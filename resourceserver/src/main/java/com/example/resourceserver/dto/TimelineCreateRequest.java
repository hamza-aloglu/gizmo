package com.example.resourceserver.dto;


import jakarta.validation.constraints.NotNull;

public class TimelineCreateRequest {
    @NotNull
    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
