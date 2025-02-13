package com.response;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthRespone {
    private String jwt;

    @JsonProperty("isAuth")
    private boolean isAuth;

    @Override
    public String toString() {
        return "AuthRespone{" +
                "jwt='" + jwt + '\'' +
                ", isAuth=" + isAuth +
                '}';
    }
}
