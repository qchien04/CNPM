package com.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @SuppressWarnings("null")
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/sockjs")
                .addInterceptors(new CustomHandshakeInterceptor())
                .setAllowedOrigins("http://localhost:3000", "http://localhost:5174", "http://localhost:5173")
                .withSockJS();

        registry.addEndpoint("/sockjs2")
                .setAllowedOrigins("http://localhost:3000", "http://localhost:5174", "http://localhost:5173")
                .withSockJS();


        registry.addEndpoint("/ws")
                .addInterceptors(new CustomHandshakeInterceptor())
                .setAllowedOrigins("http://localhost:3000", "http://localhost:5174", "http://localhost:5173");

    }

    @SuppressWarnings("null")
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/friend","/typing","/topic");
        registry.setUserDestinationPrefix("/user");
    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registry) {
        registry.setMessageSizeLimit(512 * 1024) // 512KB
                .setSendBufferSizeLimit(1024 * 1024) // 1MB
                .setTimeToFirstMessage(5000); // 5 giây timeout
    }

}



//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.web.socket.WebSocketSession;
//import org.springframework.web.socket.server.HandshakeInterceptor;
//
//import java.util.Map;
//
//public class CustomHandshakeInterceptor implements HandshakeInterceptor {
//
//    @Override
//    public boolean beforeHandshake(
//            ServerHttpRequest request,
//            ServerHttpResponse response,
//            WebSocketHandler wsHandler,
//            Map<String, Object> attributes) throws Exception {
//
//        // Kiểm tra header hoặc token
//        String authToken = request.getHeaders().getFirst("Authorization");
//        if (authToken == null || !isValidToken(authToken)) {
//            // Từ chối kết nối
//            return false;
//        }
//
//        // Lưu thông tin xác thực vào attributes để sử dụng sau
//        attributes.put("user", extractUserFromToken(authToken));
//        return true;
//    }
//
//    @Override
//    public void afterHandshake(
//            ServerHttpRequest request,
//            ServerHttpResponse response,
//            WebSocketHandler wsHandler,
//            Exception exception) {
//        // Không cần xử lý ở đây nếu không có nhu cầu
//    }
//
//    private boolean isValidToken(String token) {
//        // Xác thực token (ví dụ: JWT hoặc API key)
//        return "valid-token".equals(token);
//    }
//
//    private String extractUserFromToken(String token) {
//        // Trích xuất thông tin người dùng từ token
//        return "user1";
//    }
//}
//
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.ChannelInterceptor;
//
//public class CustomChannelInterceptor implements ChannelInterceptor {
//
//    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
//        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
//
//        // Kiểm tra quyền dựa trên header
//        String authToken = accessor.getFirstNativeHeader("Authorization");
//        if (authToken == null || !isValidToken(authToken)) {
//            throw new SecurityException("Unauthorized");
//        }
//
//        // Nếu cần, thêm thông tin người dùng vào message headers
//        accessor.setUser(new CustomPrincipal("user1"));
//
//        return message;
//    }
//
//    private boolean isValidToken(String token) {
//        // Xác thực token
//        return "valid-token".equals(token);
//    }
//}
//
//@Override
//public void configureClientInboundChannel(ChannelRegistration registration) {
//    registration.interceptors(new CustomChannelInterceptor());
//}