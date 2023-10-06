package com.example.resourceserver.service;

import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.*;

@Service
public class ScheduleService {
    private final Map<Long, ScheduledFuture<?>> tasksMap = new ConcurrentHashMap<>();

    private final ScheduledThreadPoolExecutor executor;

    public ScheduleService() {
        this.executor = new ScheduledThreadPoolExecutor(10);
        this.executor.setRemoveOnCancelPolicy(true);
    }

    public void scheduleTask(Long cardId, Runnable command, Date date) {

        long delayTimeSeconds = (date.getTime() - System.currentTimeMillis()) / 1000;
        ScheduledFuture<?> var = executor.schedule(command, delayTimeSeconds, TimeUnit.SECONDS);
        tasksMap.put(cardId, var);
    }

    public void unsetTask(Long cardId) {
        ScheduledFuture<?> task = tasksMap.remove(cardId);

        // Prevent running the task that has been removed
        if (task != null) {
            task.cancel(true);
        }
    }

    public boolean hasTask(Long cardId) {
        return tasksMap.containsKey(cardId);
    }

    // Gracefully shutdown
    @PreDestroy
    public void cleanup() {
        executor.shutdown();
        try {
            if (!executor.awaitTermination(5, TimeUnit.SECONDS)) {
                executor.shutdownNow();
            }
        } catch (InterruptedException e) {
            executor.shutdownNow();
        }
    }
}
