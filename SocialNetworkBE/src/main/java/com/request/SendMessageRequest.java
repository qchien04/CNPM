package com.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SendMessageRequest {
    private String send_email;
    private String receive_email;
    private String content;
    private LocalDateTime time_send;
    private Integer room_id;
    private String image_url;
    @JsonProperty("is_read")
    private boolean is_read;
    @JsonProperty("is_image")
    private boolean is_image;

}
