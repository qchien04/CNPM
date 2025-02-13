package com.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TypingPayload {
    private String name;
    private String type;
    private String emailSend;
    private String emailReceive;

    @Override
    public String toString() {
        return "TypingPayload{" +
                "name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", emailSend='" + emailSend + '\'' +
                ", emailReceive='" + emailReceive + '\'' +
                '}';
    }
}
