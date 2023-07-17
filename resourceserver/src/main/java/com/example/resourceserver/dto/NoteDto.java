package com.example.resourceserver.dto;

import com.example.resourceserver.model.Card;

public class NoteDto {
    private String title;
    private String content;

    public NoteDto() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}
