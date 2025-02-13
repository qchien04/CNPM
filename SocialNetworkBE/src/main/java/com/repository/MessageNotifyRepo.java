package com.repository;



import com.entity.chatrealtime.MessageNotify;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface MessageNotifyRepo extends JpaRepository<MessageNotify,Integer> {
    Optional<MessageNotify> findById(Integer id);

    List<MessageNotify> findBySendTo(String email);

    @Modifying
    @Transactional
    @Query("DELETE FROM MessageNotify WHERE sendTo=:sendTo AND sendFrom=:sendFrom")
    void deleteBySendToAndSendFrom(@Param("sendTo")String sendTo,@Param("sendFrom")String sendFrom);


}

