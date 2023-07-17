package com.example.resourceserver.service;

import com.example.resourceserver.dto.CardCreateRequest;
import com.example.resourceserver.dto.CardDto;
import com.example.resourceserver.mapper.CardMapper;
import com.example.resourceserver.model.Card;
import com.example.resourceserver.repository.CardRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

@Service
public class CardService {
    private CardRepository cardRepository;
    CardMapper cardMapper = Mappers.getMapper(CardMapper.class);

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public CardDto saveCard(CardCreateRequest cardCreateRequest) {
        Card card = cardMapper.cardCreateRequestToCard(cardCreateRequest);
        Card savedCard = cardRepository.save(card);

        return cardMapper.cardToCardDto(savedCard);
    }


    public CardRepository getCardRepository() {
        return cardRepository;
    }

    public void setCardRepository(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }
}
