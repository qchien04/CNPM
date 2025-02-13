package com.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = "OTPCode")
public class OTPCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "data", nullable = false, length = 255)
    private String data;

    @Column(name = "mail", nullable = false, length = 255)
    private String mail;
    @Column(name = "expiry_time", nullable = false)
    private LocalDateTime expiryTime;

    // Constructors
    public OTPCode() {}

    public OTPCode(String data, String mail, int excepttime) {
        this.data = data;
        this.mail=mail;
        LocalDateTime currentTime = LocalDateTime.now();
        this.expiryTime = currentTime.plus(excepttime, ChronoUnit.MINUTES);

    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public LocalDateTime getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(LocalDateTime expiryTime) {
        this.expiryTime = expiryTime;
    }

    @Override
    public String toString() {
        return "TempRecord{" +
                "id=" + id +
                ", data='" + data + '\'' +
                ", mail='" + mail + '\'' +
                ", expiryTime=" + expiryTime +
                '}';
    }
}
