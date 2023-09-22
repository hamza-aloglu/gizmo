package com.example.resourceserver.service;

import com.example.resourceserver.dto.CardColumnUpdateRequest;
import com.example.resourceserver.dto.CardCreateRequest;
import com.example.resourceserver.dto.CardDto;
import com.example.resourceserver.dto.CardIndexUpdateRequest;
import com.example.resourceserver.exception.AlreadyReportedException;
import com.example.resourceserver.exception.NotFoundException;
import com.example.resourceserver.mapper.CardMapper;
import com.example.resourceserver.model.Card;
import com.example.resourceserver.model.KanbanColumn;
import com.example.resourceserver.repository.CardRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.*;

@Service
public class CardService {
    private final CardRepository cardRepository;
    private final KanbanColumnService kanbanColumnService;
    private final BoardService boardService;
    private final ScheduleService scheduleService;
    private final MapperService mapperService;
    CardMapper cardMapper = Mappers.getMapper(CardMapper.class);

    public CardService(CardRepository cardRepository, KanbanColumnService kanbanColumnService, BoardService boardService, ScheduleService scheduleService, MapperService mapperService) {
        this.cardRepository = cardRepository;
        this.kanbanColumnService = kanbanColumnService;
        this.boardService = boardService;
        this.scheduleService = scheduleService;
        this.mapperService = mapperService;
    }

    public CardDto saveCard(CardCreateRequest cardCreateRequest) {
        Card card = cardMapper.cardCreateRequestToCard(cardCreateRequest);

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
        return cardMapper.cardToCardDto(savedCard, mapperService);
    }

    public List<CardDto> getAllCards(Long kanbanColumnId) {
        if (!kanbanColumnService.isKanbanColumnExistsById(kanbanColumnId)) {
            throw new NotFoundException("Kanban Column not found with id: " + kanbanColumnId);
        }

        return cardMapper.listCardToListCardDto(cardRepository.findAllByKanbanColumn_Id(kanbanColumnId), mapperService);
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
        return cardMapper.listCardToListCardDto(cards, mapperService);
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

        scheduleService.tasksMap.computeIfPresent(card.getId(), (cardId, scheduledFuture) -> {
            scheduledFuture.cancel(true);
            return null;
        });

        cardRepository.save(card);
    }

    public void updateColumnOfCardScheduled(CardColumnUpdateRequest cardColumnUpdateRequest, Date date) {
        Card card = this.getCardById(cardColumnUpdateRequest.getCardId());
        if (scheduleService.tasksMap.containsKey(card.getId())) {
            throw new AlreadyReportedException("This card is already set for tomorrow");
        }

        scheduleService.scheduleTask(card.getId(), () -> this.updateColumnOfCard(cardColumnUpdateRequest), date);
    }

    public void unsetUpdatingColumnOfCardScheduled(Long cardId) {
        scheduleService.unsetTask(cardId);

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

        cardRepository.saveAll(cards);
    }
}
