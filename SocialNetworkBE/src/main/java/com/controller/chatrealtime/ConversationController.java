package com.controller.chatrealtime;

import com.entity.chatrealtime.Conversation;
import com.exception.ConversationException;
import com.exception.UserException;
import com.request.CreateConversationRequest;
import com.service.chatrealtime.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/conversation")
public class ConversationController {

    @Autowired
    private ConversationService conversationService;


    @PostMapping("/create")
    public ResponseEntity<Conversation> createConversationHandler(@RequestBody CreateConversationRequest createConversationRequest) throws UserException, ConversationException {

        Conversation conversation=conversationService.createConversation(createConversationRequest.getEmailSend(), createConversationRequest.getEmailToSend());

        return new ResponseEntity<Conversation>(conversation, HttpStatus.CREATED);

    }



    @GetMapping("/allConversation")
    public ResponseEntity<List<Conversation>> findAllConversationByUserEmailHandler(@RequestHeader("Authorization") String jwt)
            throws UserException {
        System.out.println("Call conver");
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("email "+email);
        List<Conversation> chats = conversationService.findAllConversationByUserEmail(email);

        System.out.println(chats.size());

        return new ResponseEntity<List<Conversation>>(chats, HttpStatus.OK);
    }

    @GetMapping("/findConversation")
    public ResponseEntity<List<Conversation>> findConversationByUserEmailHandler(@RequestParam(value = "key", required = false) String key,@RequestHeader("Authorization") String jwt)
            throws UserException {

        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        List<Conversation> chats = conversationService.findConversationByUserEmailWithKey(email,key);

        return new ResponseEntity<List<Conversation>>(chats, HttpStatus.OK);
    }


}