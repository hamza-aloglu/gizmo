package com.example.resourceserver.service;

import com.example.resourceserver.dto.CardCreateRequest;
import com.example.resourceserver.dto.CardDto;
import com.example.resourceserver.exception.NotFoundException;
import com.example.resourceserver.mapper.CardMapper;
import com.example.resourceserver.model.Card;
import com.example.resourceserver.repository.CardRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class CardService {
    private CardRepository cardRepository;
    private KanbanColumnService kanbanColumnService;
    CardMapper cardMapper = Mappers.getMapper(CardMapper.class);

    public CardService(CardRepository cardRepository, KanbanColumnService kanbanColumnService) {
        this.cardRepository = cardRepository;
        this.kanbanColumnService = kanbanColumnService;
    }

    public CardDto saveCard(CardCreateRequest cardCreateRequest) {
        Card card = cardMapper.cardCreateRequestToCard(cardCreateRequest);

        Long masterCardId = cardCreateRequest.getMasterCardId();
        if (masterCardId != null) {
            if (!cardRepository.existsById(masterCardId)) {
                throw new NotFoundException("master card not found with id: " + masterCardId);
            }

            populateIndex(card, masterCardId);
            card.setMasterCard(cardRepository.getCardById(masterCardId));
        }

        Long kanbanColumnId = cardCreateRequest.getKanbanColumnId();
        if (!kanbanColumnService.isKanbanColumnExistsById(kanbanColumnId)) {
            throw new NotFoundException("Kanban column not found with id: " + kanbanColumnId);
        }
        card.setKanbanColumn(kanbanColumnService.getKanbanColumnById(kanbanColumnId));

        Card savedCard = cardRepository.save(card);
        return cardMapper.cardToCardDto(savedCard);
    }

    private void populateIndex(Card card, Long masterCardId) {
        List<Card> slaveCards = cardRepository.getCardByMasterCardId(masterCardId);
        Optional<Card> highestIndexedSlaveCard = slaveCards.stream()
                .max(Comparator.comparing(Card::getIndex));
        int highestSlaveIndex = 0;
        if (highestIndexedSlaveCard.isPresent()) {
            highestSlaveIndex = highestIndexedSlaveCard.get().getIndex();
        }
        card.setIndex(highestSlaveIndex + 1);
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

    public KanbanColumnService getKanbanColumnService() {
        return kanbanColumnService;
    }

    public void setKanbanColumnService(KanbanColumnService kanbanColumnService) {
        this.kanbanColumnService = kanbanColumnService;
    }
}
