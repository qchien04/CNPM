package com.config;


import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary configKey() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dr83zoguh");
        config.put("api_key", "115279488387958");
        config.put("api_secret", "qNHwRGGDVlSlRCBMOedX1vs2xtY");
        return new Cloudinary(config);
    }
}
