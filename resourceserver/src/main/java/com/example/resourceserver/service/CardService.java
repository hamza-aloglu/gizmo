package com.example.resourceserver.service;

import com.example.resourceserver.dto.CardCreateRequest;
import com.example.resourceserver.dto.CardDto;
import com.example.resourceserver.exception.NotFoundException;
import com.example.resourceserver.mapper.CardMapper;
import com.example.resourceserver.model.Card;
import com.example.resourceserver.repository.CardRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<CardDto> getAllCards() {
        return cardMapper.listCardToListCardDto(cardRepository.findAll());
    }

    public void deleteByCardId(Long cardId) {
        if (!cardRepository.existsById(cardId)) {
            throw new NotFoundException("Card not found with id:" + cardId);
        }

        cardRepository.deleteById(cardId);
    }

    protected Card getCardById(Long cardId) {
        return cardRepository.getCardById(cardId);
    }

    protected boolean isExistByCardId(Long cardId) {
        return cardRepository.existsById(cardId);
    }


    public CardRepository getCardRepository() {
        return cardRepository;
    }

    public void setCardRepository(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }
}
