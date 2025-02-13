package com.constant;

import org.springframework.beans.factory.annotation.Value;

public class GoogleConstant {
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    public static String GOOGLE_CLIENT_ID;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    public static String GOOGLE_CLIENT_SECRET;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    public static String GOOGLE_REDIRECT_URI;


}
