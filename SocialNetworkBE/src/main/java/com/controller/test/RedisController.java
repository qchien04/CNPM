package com.controller.test;

import com.service.imple.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/redis")
public class RedisController {

    @Autowired
    private RedisService redisService;

    @PostMapping("/set")
    public String setKey(@RequestParam String key, @RequestParam String value) {
        redisService.set(key, value, 30);
        return "Key đã được lưu vào Redis!";
    }

    @GetMapping("/get")
    public Object getKey(@RequestParam String key) {
        return redisService.get(key);
    }

    @DeleteMapping("/delete")
    public String deleteKey(@RequestParam String key) {
        redisService.delete(key);
        return "Key đã bị xóa!";
    }
}
