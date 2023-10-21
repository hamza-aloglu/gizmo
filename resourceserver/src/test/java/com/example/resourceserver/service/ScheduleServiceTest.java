package com.example.resourceserver.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyLong;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Date;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;


public class ScheduleServiceTest {
    private ScheduleService scheduleService;
    private ScheduledThreadPoolExecutor executor;

    @BeforeEach
    void setup() {
        executor = Mockito.mock(ScheduledThreadPoolExecutor.class);
        scheduleService = new ScheduleService(executor);
    }

    @Test
    void scheduleTask_shouldPutCardIdAndScheduledFutureIntoTasksMap() {
        Long cardId = 123L;
        Runnable command = Mockito.mock(Runnable.class);
        Date date = new Date(System.currentTimeMillis() + 5000);
        ScheduledFuture future = Mockito.mock(ScheduledFuture.class);

        Mockito.when(executor.schedule(Mockito.any(Runnable.class), Mockito.any(Long.class), Mockito.any(TimeUnit.class)))
                .thenReturn(future);
        scheduleService.scheduleTask(cardId, command, date);

        Mockito.verify(executor).schedule(Mockito.eq(command), anyLong(), Mockito.eq(TimeUnit.SECONDS));
        assertTrue(scheduleService.getTasksMap().containsKey(cardId));
        assertEquals(future, scheduleService.getTasksMap().get(cardId));
    }
}
