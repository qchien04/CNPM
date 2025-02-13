package com.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthoritiesResponse {
    private String email;
    private String avt;
    private String name;
    private List<String> authorities;
    private List<String> roles;

    @Override
    public String toString() {
        return "AuthoritiesResponse{" +
                "email='" + email + '\'' +
                ", avt='" + avt + '\'' +
                ", name='" + name + '\'' +
                ", authorities=" + authorities +
                ", roles=" + roles +
                '}';
    }
}
