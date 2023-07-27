package com.example.resourceserver.dto;

import jakarta.validation.constraints.NotNull;

public class NoteCreateRequest {
    private String title;
    private String content = "";
    @NotNull
    private Long cardId;

    public NoteCreateRequest() {

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

    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }
}
