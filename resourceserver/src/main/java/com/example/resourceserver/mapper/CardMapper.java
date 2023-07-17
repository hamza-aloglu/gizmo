package com.example.resourceserver.mapper;

import com.example.resourceserver.dto.CardCreateRequest;
import com.example.resourceserver.dto.CardDto;
import com.example.resourceserver.model.Card;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface CardMapper {
    CardDto cardToCardDto(Card card);
    Card cardCreateRequestToCard(CardCreateRequest cardCreateRequest);
    List<CardDto> listCardToListCardDto(List<Card> cards);
}
