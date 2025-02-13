package com.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean
    public ThreadPoolTaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);  // Số luồng cơ bản
        executor.setMaxPoolSize(10);  // Số luồng tối đa
        executor.setQueueCapacity(25);  // Số lượng yêu cầu chờ trong hàng đợi
        executor.setThreadNamePrefix("Async-");  // Tiền tố tên luồng
        executor.initialize();
        return executor;
    }
}
