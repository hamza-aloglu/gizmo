package com.example.resourceserver.dto;

public class CardIndexUpdateRequest {
    private Long cardId;
    private int index;

    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }
}
