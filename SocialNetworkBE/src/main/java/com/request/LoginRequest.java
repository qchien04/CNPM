package com.request;

import org.antlr.v4.runtime.misc.NotNull;

public class LoginRequest {
    @NotNull
    private String username;

    @NotNull
    private String password;

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }



    // prettier-ignore
    @Override
    public String toString() {
        return "LoginVM{" +
                "username='" + username + '\'' +
                '}';
    }
}
