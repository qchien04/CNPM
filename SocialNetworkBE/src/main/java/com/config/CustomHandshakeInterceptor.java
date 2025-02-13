package com.config;


import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

public class CustomHandshakeInterceptor implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(
            ServerHttpRequest request,
            ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Map<String, Object> attributes) throws Exception {
        System.out.println("Chuẩn bị kết nối ws");
        return true;
    }

    @Override
    public void afterHandshake(
            ServerHttpRequest request,
            ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Exception exception) {
        // Không cần xử lý ở đây nếu không có nhu cầu
    }

    private boolean isValidToken(String token) {
        // Xác thực token (ví dụ: JWT hoặc API key)
        return "valid-token".equals(token);
    }

    private String extractUserFromToken(String token) {
        return "user1";
    }
}