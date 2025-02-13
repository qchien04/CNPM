package com.request;



public class AuthAccount {
    private String username;
    private String email;
    private String password;
    private String otp;

    public AuthAccount() {
    }

    public AuthAccount(String username, String password, String email,String otp) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.otp = otp;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public String getOtp() {
        return otp;
    }
    public void setOtp(String otp) {
        this.otp = otp;
    }
}
