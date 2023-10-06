package com.example.resourceserver.listener;

import com.example.resourceserver.model.Card;
import com.example.resourceserver.service.ScheduleService;
import jakarta.persistence.PostRemove;
import org.springframework.stereotype.Component;

@Component
public class CardListener {
    private final ScheduleService scheduleService;

    public CardListener(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @PostRemove
    public void removeScheduledTasks(Card card) {
        if (scheduleService.hasTask(card.getId())) {
            scheduleService.unsetTask(card.getId());
        }
    }
}
