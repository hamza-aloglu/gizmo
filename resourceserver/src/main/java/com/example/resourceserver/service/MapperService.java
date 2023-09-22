package com.example.resourceserver.service;

import org.springframework.stereotype.Service;

@Service
public class MapperService {
    private final ScheduleService scheduleService;

    public MapperService(ScheduleService scheduleService) {

        this.scheduleService = scheduleService;
    }

    public boolean isCardUpdateTomorrow(Long cardId) {
        return scheduleService.tasksMap.containsKey(cardId);
    }
}
