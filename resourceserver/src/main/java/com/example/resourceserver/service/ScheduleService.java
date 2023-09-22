package com.example.resourceserver.service;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.*;

@Service
public class ScheduleService {
    protected final Map<Long, ScheduledFuture<?>> tasksMap = new ConcurrentHashMap<>();

    public void scheduleTask(Long cardId, Runnable command, Date date) {
        ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(1);  // single-threaded
        executor.setRemoveOnCancelPolicy(true);  // remove tasks from the queue upon cancellation
        ScheduledExecutorService executorService = Executors.unconfigurableScheduledExecutorService(executor);

        long delayTimeSeconds = (date.getTime() - System.currentTimeMillis()) / 1000;
        ScheduledFuture<?> var = executorService.schedule(command,
                delayTimeSeconds, TimeUnit.SECONDS);
        tasksMap.put(cardId, var);

        executorService.shutdown();
    }

    public void unsetTask(Long cardId) {
        ScheduledFuture<?> task = tasksMap.remove(cardId);
        task.cancel(true);
    }
}
