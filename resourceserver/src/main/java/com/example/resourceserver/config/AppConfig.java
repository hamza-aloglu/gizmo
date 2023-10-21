package com.example.resourceserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.ScheduledThreadPoolExecutor;

@Configuration
public class AppConfig {
    @Bean
    public ScheduledThreadPoolExecutor scheduledThreadPoolExecutor() {
        ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(10);
        executor.setRemoveOnCancelPolicy(true);
        return executor;
    }
}
