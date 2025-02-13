package com.controller.chatrealtime;


import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class VideoCallController {
    ArrayList<String> users = new ArrayList<String>();

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;


    @RequestMapping(value = "/",method =  RequestMethod.GET)
    public String Index(){
        return "index";
    }

    @MessageMapping("/testServer")
    @SendTo("/topic/testServer")
    public String testServer(String Test){
        System.out.println("Testing Server");
        return Test;
    }

    @MessageMapping("/addUser")
    public void addUser(String user){
        System.out.println("Adding User");
    }

    @MessageMapping("/call")
    public void Call(String call){
        JSONObject jsonObject = new JSONObject(call);       
        System.out.println("Calling to class: "+jsonObject.get("callTo").getClass()+" Call from class "+jsonObject.get("callFrom").getClass());
        simpMessagingTemplate.convertAndSend("/topic/"+jsonObject.getString("callTo")+"/call",jsonObject.get("callFrom"));
    }

    @MessageMapping("/offer")
    public void Offer(String offer){

        System.out.println("Offer Came");
        JSONObject jsonObject = new JSONObject(offer);
        simpMessagingTemplate.convertAndSend("/topic/"+jsonObject.getString("toUser")+"/offer",offer);
    }

    @MessageMapping("/answer")
    public void Answer(String answer){
        JSONObject jsonObject = new JSONObject(answer);
        simpMessagingTemplate.convertAndSend("/topic/"+jsonObject.getString("toUser")+"/answer",answer);
        System.out.println("Answer Sent "+jsonObject.getString("toUser"));
    }
    @MessageMapping("/candidate")
    public void Candidate(String candidate){
        JSONObject jsonObject = new JSONObject(candidate);

        simpMessagingTemplate.convertAndSend("/topic/"+jsonObject.getString("toUser")+"/candidate",candidate);


    }

}
