package com.example.resourceserver.dto;

import jakarta.validation.constraints.NotNull;

public class NoteContentUpdateRequest {
    @NotNull
    private Long id;
    private String content;

    public NoteContentUpdateRequest() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
