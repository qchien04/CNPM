package com.controller.chatrealtime;

import com.service.SseService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/sse")
public class SSEChatRealTimeController {

    private final SseService sseService;

    public SSEChatRealTimeController(SseService sseService) {
        this.sseService = sseService;
    }

    /**
     * Client subscribe để lắng nghe SSE theo emailId.
     */
    @GetMapping("/subscribe/{emailId}")
    public SseEmitter subscribe(@PathVariable String emailId) {
        return sseService.addEmitter(emailId);
    }

}
