package com.example.resourceserver.mapper;

import com.example.resourceserver.dto.CardCreateRequest;
import com.example.resourceserver.dto.CardDto;
import com.example.resourceserver.model.Card;
import com.example.resourceserver.service.ScheduleService;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface CardMapper {
    @Mapping(target = "willUpdateTomorrow", expression = "java(scheduleService.hasTask(card.getId()))")
    CardDto cardToCardDto(Card card, @Context ScheduleService scheduleService);
    Card cardCreateRequestToCard(CardCreateRequest cardCreateRequest);
    default List<CardDto> listCardToListCardDto(List<Card> cards, @Context ScheduleService scheduleService) {
        if (cards == null) {
            return null;
        }

        List<CardDto> list = new ArrayList<>(cards.size());
        for (Card card : cards) {
            list.add(cardToCardDto(card, scheduleService));
        }

        return list;
    }
}
