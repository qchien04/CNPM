package com.entity.chatrealtime;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "messagenotify")
public class MessageNotify {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    Integer id;

    @Column(name = "sendFrom")
    String sendFrom;

    @Column(name = "sendTo")
    String sendTo;

    @Column(name = "content")
    String content;

    @Column(name = "sendAt")
    LocalDateTime sendAt;

}
