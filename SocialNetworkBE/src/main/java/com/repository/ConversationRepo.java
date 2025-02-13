package com.repository;

import com.entity.chatrealtime.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface ConversationRepo extends JpaRepository<Conversation,Integer> {

    @Query("select c from Conversation c where c.user1_email=:email or c.user2_email=:email")
    public List<Conversation> findAllConversationByUserEmail(@Param("email") String email);

    @Query("select c from Conversation c where c.user1_email=:email1 and c.user2_email=:email2" +
            " or (c.user1_email=:email2 and c.user2_email=:email1)")
    public Conversation findConversationBy2UserEmail(@Param("email1") String email_req,@Param("email2") String email_req2);

    @Query("select c from Conversation c where (c.user1_email=:email and c.user2_email LIKE %:key%)" +
            " or (c.user2_email=:email and c.user1_email LIKE %:key%)")
    public List<Conversation> findConversationByUserEmailWithKey(@Param("email") String email,@Param("key") String key);

    @Modifying
    @Transactional
    @Query("UPDATE Conversation c SET c.last_message = :lastMessage, c.user_send_last_message = :email WHERE c.id = :id")
    int updatePreviewConversation(@Param("id") Integer id, @Param("email") String email, @Param("lastMessage") String lastMessage);

}
