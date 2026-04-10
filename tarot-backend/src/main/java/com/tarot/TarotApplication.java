package com.tarot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TarotApplication {
    public static void main(String[] args) {
        SpringApplication.run(TarotApplication.class, args);
        System.out.println("塔罗牌后端服务已启动: http://localhost:8081");
    }
}