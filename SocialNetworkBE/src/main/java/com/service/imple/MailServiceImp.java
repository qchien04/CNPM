package com.service.imple;

import com.service.MailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MailServiceImp implements MailService {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String emailFrom;

    @Async
    public void sendEmail(String recipients, String subject, String content, MultipartFile[] files) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true,"UTF-8");
        helper.setFrom(emailFrom);

        if(recipients.contains(",")){
            helper.setTo(InternetAddress.parse(recipients));
        }else{
            helper.setTo(recipients);
        }

        if(files != null){
            for(MultipartFile file:files){
                helper.addAttachment(Objects.requireNonNull(file.getOriginalFilename()),file);
            }
        }
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);

    }
}
