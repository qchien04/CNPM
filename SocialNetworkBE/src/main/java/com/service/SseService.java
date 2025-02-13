package com.service;

import com.entity.chatrealtime.MessageNotify;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SseService {
    private final Map<String, SseEmitter> userEmitters = new ConcurrentHashMap<>();

    /**
     * Thêm client (user) vào danh sách lắng nghe SSE.
     */
    public SseEmitter addEmitter(String emailId) {
        SseEmitter emitter = new SseEmitter(0L); // Không giới hạn thời gian
        userEmitters.put(emailId, emitter);

        // Xóa emitter nếu client đóng kết nối
        emitter.onCompletion(() -> userEmitters.remove(emailId));
        emitter.onTimeout(() -> userEmitters.remove(emailId));

        return emitter;
    }

    /**
     * Gửi thông báo đến một user cụ thể theo emailId.
     */
    public void sendNotification(String emailId, MessageNotify message) {
        SseEmitter emitter = userEmitters.get(emailId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .name("notification")
                        .data(message));
            } catch (IOException e) {
                emitter.complete();
                userEmitters.remove(emailId);
            }
        }
    }
}

