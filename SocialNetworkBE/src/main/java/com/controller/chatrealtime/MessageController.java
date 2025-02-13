package com.controller.chatrealtime;


import com.entity.chatrealtime.Message;
import com.service.chatrealtime.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController {

    @Autowired
    private MessageService messageService;
//
//    @Autowired
//    private UserService userService;
//
//    @PostMapping("/create")
//    public ResponseEntity<Message> sendMessageHandler(@RequestBody SendMessageRequest sendMessageRequest,
//                                                      @RequestHeader("Authorization") String jwt) throws UserException, ChatException {
//
//        User user = this.userService.findByJwt(jwt);
//
//        sendMessageRequest.setUserId(user.getId());
//        System.out.println("bat dau create mess");
//        Message message = this.messageService.sendMessage(sendMessageRequest);
//        System.out.println("Done create");
//        return new ResponseEntity<Message>(message, HttpStatus.OK);
//    }
//
    @GetMapping("/allMessage")
    public ResponseEntity<List<Message>> getChatMessageHandler(@RequestParam("email1") String email1,
                                                               @RequestParam("email2") String email2,
                                                               @RequestHeader("Authorization") String jwt) {
        System.out.println(email1+" "+email2);
        List<Message> res=messageService.findAllMessageBy2Email(email1,email2);
        System.out.println(res.size());
        return new ResponseEntity<List<Message>>(res, HttpStatus.OK);
    }
//
//    @DeleteMapping("/{messageId}")
//    public ResponseEntity<ApiResponse> deleteMessageHandler(@PathVariable Integer messageId,
//                                                            @RequestHeader("Authorization") String jwt) throws UserException, ChatException, MessageException, MessageException {
//
//        User user = this.userService.findByJwt(jwt);
//
//        this.messageService.deleteMessage(messageId, user);
//
//        ApiResponse res = new ApiResponse("Deleted successfully......", false);
//
//        return new ResponseEntity<>(res, HttpStatus.OK);
//    }

}