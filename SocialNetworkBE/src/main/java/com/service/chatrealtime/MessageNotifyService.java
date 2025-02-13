package com.service.chatrealtime;

import com.entity.chatrealtime.MessageNotify;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MessageNotifyService {
    MessageNotify findById(Integer id);

    MessageNotify create(MessageNotify messageNotify);

    List<MessageNotify> findBySendTo(String email);

    void deleteBySendToAndSendFrom(String sendTo,String sendFrom);

    MessageNotify deleteBySendFrom(String email);


}
