package com.service.imple;


import com.entity.auth.User;
import com.entity.chatrealtime.Conversation;
import com.exception.ConversationException;
import com.repository.ConversationRepo;
import com.service.auth.UserService;
import com.service.chatrealtime.ConversationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ConversationServiceImp implements ConversationService {

    private ConversationRepo conversationRepo;
    private UserService userService;


    @Override
    @Transactional
    public Conversation createConversation(String email_req, String email_recieve) throws ConversationException {
        User user1 = this.userService.findByEmail(email_req);
        User user2 = this.userService.findByEmail(email_recieve);
        Conversation isChatExist = conversationRepo.findConversationBy2UserEmail(email_req, email_recieve);
        if (isChatExist != null) {
            throw new ConversationException("Duplicate");
        }
        if(email_req.equals(email_recieve)){
            throw new ConversationException("Can not create room");

        }
        Conversation chat = new Conversation();
        chat.setUser1_email(email_req);
        chat.setUser1_avt(user1.getUserProfile().getAvt());
        chat.setUser1_name(user1.getUserProfile().getName());

        chat.setUser2_email(email_recieve);
        chat.setUser2_avt(user2.getUserProfile().getAvt());
        chat.setUser2_name(user2.getUserProfile().getName());

        chat = conversationRepo.save(chat);
        return chat;
    }

    @Override
    @Transactional
    public void updatePreviewonversation(Integer id, String emailSendLastMessage, String lastMessage) {
        int t=conversationRepo.updatePreviewConversation(id,emailSendLastMessage,lastMessage);
    }

    //    public Conversation findChatRoomById(Integer chatId) throws ChatException {
//        return conversationRepo.findById(chatId)
//                .orElseThrow(() -> new ChatException("The requested chat is not found"));
//    }
    @Override
    public List<Conversation> findAllConversationByUserEmail(String email) {
        List<Conversation> chats = conversationRepo.findAllConversationByUserEmail(email);

        return chats;

    }

    @Override
    public List<Conversation> findConversationByUserEmailWithKey(String email, String key) {
        List<Conversation> chats = conversationRepo.findConversationByUserEmailWithKey(email,key);
        return chats;
    }

}
