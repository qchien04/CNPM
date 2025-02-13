package com.repository;


import com.entity.chatrealtime.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepo extends JpaRepository<Message,Integer> {
    @Query("select m from Message m where (m.send_email=:email1 and m.receive_email=:email2)" +
            " or (m.send_email=:email2 and m.receive_email=:email1)")
    public List<Message> findBy2UserEmail(@Param("email1") String email1,@Param("email2") String email2);
}
