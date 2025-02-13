package com.entity.chatrealtime;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "content")
    private String content;

    @JsonProperty("is_read")
    @Column(name = "is_read")
    private boolean is_read;

    @JsonProperty("is_image")
    @Column(name = "is_image")
    private boolean is_image;

    @Column(name = "time_send")
    private LocalDateTime time_send;

    @Column(name = "send_email")
    private String send_email;

    @Column(name = "room_id")
    private Integer room_id;

    @Column(name = "receive_email")
    private String receive_email;



}
