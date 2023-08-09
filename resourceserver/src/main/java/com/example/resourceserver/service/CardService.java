package com.example.resourceserver.service;

import com.example.resourceserver.dto.CardColumnUpdateRequest;
import com.example.resourceserver.dto.CardCreateRequest;
import com.example.resourceserver.dto.CardDto;
import com.example.resourceserver.dto.CardIndexUpdateRequest;
import com.example.resourceserver.exception.NotFoundException;
import com.example.resourceserver.mapper.CardMapper;
import com.example.resourceserver.model.Card;
import com.example.resourceserver.model.KanbanColumn;
import com.example.resourceserver.repository.CardRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

@Service
public class CardService {
    private CardRepository cardRepository;
    private KanbanColumnService kanbanColumnService;
    private BoardService boardService;
    CardMapper cardMapper = Mappers.getMapper(CardMapper.class);

    public CardService(CardRepository cardRepository, KanbanColumnService kanbanColumnService, BoardService boardService) {
        this.cardRepository = cardRepository;
        this.kanbanColumnService = kanbanColumnService;
        this.boardService = boardService;
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
        KanbanColumn kanbanColumn = kanbanColumnService.getKanbanColumnById(kanbanColumnId);
        card.setKanbanColumn(kanbanColumn);

        List<Card> allCardsByBoard = cardRepository.findAllCardsByBoardId(kanbanColumn.getBoard().getId());
        OptionalInt maxIndex = allCardsByBoard.stream()
                .mapToInt(Card::getIndex)
                .max();
        if (maxIndex.isPresent()) {
            card.setIndex(maxIndex.getAsInt() + 1);
        }

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

    public List<CardDto> getAllCards(Long kanbanColumnId) {
        if (!kanbanColumnService.isKanbanColumnExistsById(kanbanColumnId)) {
            throw new NotFoundException("Kanban Column not found with id: " + kanbanColumnId);
        }

        return cardMapper.listCardToListCardDto(cardRepository.findAllByKanbanColumn_Id(kanbanColumnId));
    }

    public void deleteByCardId(Long cardId) {
        if (!cardRepository.existsById(cardId)) {
            throw new NotFoundException("Card not found with id:" + cardId);
        }

        cardRepository.deleteById(cardId);
    }

    protected Card getCardById(Long cardId) {
        if (!cardRepository.existsById(cardId)) {
            throw new NotFoundException("Card not found with id:" + cardId);
        }

        return cardRepository.getCardById(cardId);
    }

    protected boolean isExistByCardId(Long cardId) {
        return cardRepository.existsById(cardId);
    }

    public List<CardDto> getAllCardsByBoardIdSortedByIndex(Long boardId) {
        if (!boardService.isBoardExists(boardId)) {
            throw new NotFoundException("Board not found with id: " + boardId);
        }

        List<Card> cards = cardRepository.findAllCardsByBoardIdAndOrderOrderByIndex(boardId);
        return cardMapper.listCardToListCardDto(cards);
    }

    public void updateCardTitle(String title, Long cardId) {
        Card card = this.getCardById(cardId);
        card.setTitle(title);
        cardRepository.save(card);
    }

    public void updateColumnOfCard(CardColumnUpdateRequest cardColumnUpdateRequest) {
        Card card = this.getCardById(cardColumnUpdateRequest.getCardId());
        KanbanColumn targetColumn = kanbanColumnService.getKanbanColumnById(cardColumnUpdateRequest.getTargetColumnId());
        card.setKanbanColumn(targetColumn);
        cardRepository.save(card);
    }

    public void updateCards(List<CardIndexUpdateRequest> cardRequests) {
        List<Card> cards = cardRequests.stream()
                .map(request -> {
                    Optional<Card> cardOptional = cardRepository.findById(request.getCardId());
                    if (cardOptional.isPresent()) {
                        Card card = cardOptional.get();
                        card.setIndex(request.getIndex());
                        return Optional.of(card);
                    } else {
                        return Optional.<Card>empty();
                    }
                })
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();

        //save that list.
        cardRepository.saveAll(cards);
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
