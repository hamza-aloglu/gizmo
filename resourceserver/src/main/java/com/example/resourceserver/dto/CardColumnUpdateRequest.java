package com.example.resourceserver.dto;

public class CardColumnUpdateRequest {
    private Long sourceColumnId;
    private Long targetColumnId;
    private Long cardId;

    public Long getSourceColumnId() {
        return sourceColumnId;
    }

    public void setSourceColumnId(Long sourceColumnId) {
        this.sourceColumnId = sourceColumnId;
    }

    public Long getTargetColumnId() {
        return targetColumnId;
    }

    public void setTargetColumnId(Long targetColumnId) {
        this.targetColumnId = targetColumnId;
    }

    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }
}
