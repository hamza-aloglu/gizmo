package com.example.resourceserver.service;

import com.example.resourceserver.dto.CardColumnUpdateRequest;
import com.example.resourceserver.exception.AlreadyReportedException;
import com.example.resourceserver.model.Card;
import com.example.resourceserver.repository.CardRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;

public class CardServiceTest {
    private CardService cardService;
    private ScheduleService scheduleService;
    private CardRepository cardRepository;

    @BeforeEach
    void setup() {
        cardRepository = Mockito.mock(CardRepository.class);
        KanbanColumnService kanbanColumnService = Mockito.mock(KanbanColumnService.class);
        BoardService boardService = Mockito.mock(BoardService.class);
        scheduleService = Mockito.mock(ScheduleService.class);
        cardService = new CardService(cardRepository, kanbanColumnService, boardService, scheduleService);
    }

    @Test
    void updateColumnOfCardScheduled_shouldThrowAlreadyReportedExceptionIfTaskIsScheduledBefore() {
        Card mockCard = Mockito.mock(Card.class);
        Mockito.when(mockCard.getId()).thenReturn(123L);
        Mockito.when(cardRepository.existsById(123L)).thenReturn(true);
        Mockito.when(cardRepository.getCardById(123L)).thenReturn(mockCard);
        Mockito.when(scheduleService.hasTask(anyLong())).thenReturn(true);
        CardColumnUpdateRequest mockCardColumnUpdateRequest = Mockito.mock(CardColumnUpdateRequest.class);
        Mockito.when(mockCardColumnUpdateRequest.getCardId()).thenReturn(123L);

        assertThrows(AlreadyReportedException.class, () -> cardService.updateColumnOfCardScheduled(
                mockCardColumnUpdateRequest,
                Mockito.mock(Date.class)
        ));
    }

    @Test
    void updateColumnOfCardScheduled_shouldScheduleTaskWhenCardIsNotAlreadyScheduled() {
        Card mockCard = Mockito.mock(Card.class);
        Mockito.when(mockCard.getId()).thenReturn(123L);
        Mockito.when(cardRepository.existsById(123L)).thenReturn(true);
        Mockito.when(cardRepository.getCardById(123L)).thenReturn(mockCard);
        Mockito.when(scheduleService.hasTask(anyLong())).thenReturn(false);
        CardColumnUpdateRequest mockCardColumnUpdateRequest = Mockito.mock(CardColumnUpdateRequest.class);
        Mockito.when(mockCardColumnUpdateRequest.getCardId()).thenReturn(123L);

        cardService.updateColumnOfCardScheduled(mockCardColumnUpdateRequest, Mockito.mock(Date.class));

        Mockito.verify(scheduleService).scheduleTask(
                any(Long.class),
                any(Runnable.class),
                any(Date.class)
        );
    }
}
