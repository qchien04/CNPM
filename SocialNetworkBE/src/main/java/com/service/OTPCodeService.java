package com.service;


import com.entity.OTPCode;
import org.springframework.stereotype.Service;

@Service
public interface OTPCodeService {
    OTPCode findOTPCode(String mail, String data);
    void saveOTPCode(OTPCode otpCode);
}
