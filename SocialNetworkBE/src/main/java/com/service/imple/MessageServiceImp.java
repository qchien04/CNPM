package com.service.imple;


import com.entity.chatrealtime.Message;
import com.repository.MessageRepo;
import com.request.SendMessageRequest;
import com.service.chatrealtime.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;



@Service
public class MessageServiceImp implements MessageService {

    @Autowired
    private MessageRepo messageRepo;

    @Autowired
    private UserServiceImp userService;


    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Override
    public Message sendMessage(SendMessageRequest req) {

        Message message = new Message();
        message.setSend_email(req.getSend_email());
        message.setReceive_email(req.getReceive_email());
        message.setContent(req.getContent());
        message.setTime_send(req.getTime_send());
        message.set_image(req.is_image());
        message = messageRepo.save(message);

        messagingTemplate.convertAndSend( "/friend/" + req.getReceive_email(), message);

        return message;
    }

    @Override
    @Transactional
    public Message createMessage(Message message) {
        return messageRepo.save(message);
    }

    @Override
    @Transactional
    public Message createMessageFromRequest(SendMessageRequest req) {
        Message message = new Message();
        message.setSend_email(req.getSend_email());
        message.setReceive_email(req.getReceive_email());
        message.setContent(req.getContent());
        message.setTime_send(req.getTime_send());
        message.set_image(req.is_image());
        return messageRepo.save(message);
    }

    @Override
    public List<Message> findAllMessageBy2Email(String email1, String email2) {

        List<Message> messages =messageRepo.findBy2UserEmail(email1,email2);
        return messages;
    }

}
