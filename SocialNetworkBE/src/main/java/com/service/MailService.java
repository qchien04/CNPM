package com.service;

import jakarta.mail.MessagingException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public interface MailService {
    @Async
    void sendEmail(String recipients, String subject, String content, MultipartFile[] files) throws MessagingException;
}
