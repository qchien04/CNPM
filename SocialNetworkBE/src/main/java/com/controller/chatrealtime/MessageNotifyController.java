package com.controller.chatrealtime;


import com.entity.chatrealtime.Conversation;
import com.entity.chatrealtime.MessageNotify;
import com.exception.ConversationException;
import com.exception.UserException;
import com.request.CreateConversationRequest;
import com.response.ApiResponse;
import com.service.chatrealtime.ConversationService;
import com.service.chatrealtime.MessageNotifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/messageNotify")
public class MessageNotifyController {

    @Autowired
    private MessageNotifyService messageNotifyService;



    @GetMapping("/allMessageNotify")
    public ResponseEntity<List<MessageNotify>> findAllMessageNotifyByUserEmailHandler()
            throws UserException {
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        List<MessageNotify> mn = messageNotifyService.findBySendTo(email);

        System.out.println(mn.size()+" nenenene");
        return new ResponseEntity<List<MessageNotify>>(mn, HttpStatus.OK);
    }

    @DeleteMapping("/deleteMessageNotify")
    public ResponseEntity<ApiResponse> findConversationByUserEmailHandler(@RequestParam("emailSend") String emailSend)
            throws UserException {

        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        messageNotifyService.deleteBySendToAndSendFrom(email,emailSend);

        ApiResponse res = new ApiResponse("Deleted Successfully...", true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }


}