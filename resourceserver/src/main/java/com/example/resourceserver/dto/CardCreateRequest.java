package com.example.resourceserver.dto;

public class CardCreateRequest {
    private String title;
    private Long masterCardId;

    public CardCreateRequest() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getMasterCardId() {
        return masterCardId;
    }

    public void setMasterCardId(Long masterCardId) {
        this.masterCardId = masterCardId;
    }
}
