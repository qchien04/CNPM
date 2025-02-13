package com.service.chatrealtime;


import com.entity.chatrealtime.Conversation;
import com.exception.ConversationException;

import java.util.List;


public interface ConversationService {

    public Conversation createConversation(String email1, String email2) throws ConversationException;

    public void updatePreviewonversation(Integer id,String emailSendLastMessage,String lastMessage);

    public List<Conversation> findAllConversationByUserEmail(String email);

    public List<Conversation> findConversationByUserEmailWithKey(String email,String key);


}
