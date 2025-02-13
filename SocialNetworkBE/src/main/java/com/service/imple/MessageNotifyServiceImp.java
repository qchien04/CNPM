package com.service.imple;

import com.entity.chatrealtime.MessageNotify;
import com.repository.MessageNotifyRepo;
import com.service.chatrealtime.MessageNotifyService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class MessageNotifyServiceImp implements MessageNotifyService {
    private MessageNotifyRepo messageNotifyRepo;


    @Override
    public MessageNotify findById(Integer id) {
        Optional<MessageNotify> m=messageNotifyRepo.findById(id);
        return m.isPresent()?m.get():null;

    }

    @Override
    @Transactional
    public MessageNotify create(MessageNotify messageNotify) {
        return messageNotifyRepo.save(messageNotify);
    }

    @Override
    public List<MessageNotify> findBySendTo(String email) {
        List<MessageNotify> m=messageNotifyRepo.findBySendTo(email);
        return m;
    }

    @Override
    public void deleteBySendToAndSendFrom(String sendTo, String sendFrom) {
        messageNotifyRepo.deleteBySendToAndSendFrom(sendTo,sendFrom);
    }


    @Override
    public MessageNotify deleteBySendFrom(String email) {
        return null;
    }
}
