package com.controller.chatrealtime;

import com.entity.chatrealtime.MessageNotify;
import com.request.SendMessageRequest;
import com.request.TypingPayload;
import com.service.SseService;
import com.service.UpLoadImageFileService;
import com.service.chatrealtime.ConversationService;
import com.service.chatrealtime.MessageNotifyService;
import com.service.chatrealtime.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;


@RestController
public class ChatRealTimeController {
    @Autowired
    private UpLoadImageFileService uploadImageFile;

    @Autowired
    private MessageService messageService;

    @Autowired
    private ConversationService conversationService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageNotifyService messageNotifyService;

    @Autowired
    private SseService sseService;

    @MessageMapping("/news")
    @SendTo("/topic/news")
    public String broadcastNews(@Payload String message) {
        System.out.println("goi new");
        return message;
    }

    @MessageMapping("/sendMessage")
    public void broadcast(@Payload SendMessageRequest sendMessageRequest) {
        boolean is_image=sendMessageRequest.is_image();
        if(!is_image){
            System.out.println("Tin nhan binh thuong");
            messagingTemplate.convertAndSend("/friend/" + sendMessageRequest.getReceive_email(), sendMessageRequest);
            MessageNotify mn=new MessageNotify();
            mn.setSendFrom(sendMessageRequest.getSend_email());
            mn.setSendTo(sendMessageRequest.getReceive_email());
            mn.setContent(sendMessageRequest.getContent());

            //luu thong bao
            messageNotifyService.create(mn);
            //gui thong bao sse
            sseService.sendNotification(sendMessageRequest.getReceive_email(), mn);
            //update last message
            conversationService.updatePreviewonversation(sendMessageRequest.getRoom_id(),sendMessageRequest.getSend_email(),sendMessageRequest.getContent());

            //luu tin nhan
            messageService.createMessageFromRequest(sendMessageRequest);

        }
        else{
            try {
                if (!sendMessageRequest.getImage_url().toString().equals("")) {
                    MultipartFile multipartFile = convert(sendMessageRequest.getImage_url(), "converted_file.png", "image/png");
                    String url = uploadImageFile.uploadImage(multipartFile);


                    //kiem tra co kiem nhan tin hay khong
                    String content=sendMessageRequest.getContent().trim();
                    if(content.length()>0){
                        System.out.println("Gui anh co dinh kem tin nhan");
                        sendMessageRequest.set_image(false);
                        sendMessageRequest.setImage_url("");
                        messagingTemplate.convertAndSend("/friend/" + sendMessageRequest.getReceive_email(), sendMessageRequest);
                        MessageNotify mn=new MessageNotify();

                        mn.setSendFrom(sendMessageRequest.getSend_email());
                        mn.setSendTo(sendMessageRequest.getReceive_email());
                        mn.setContent(sendMessageRequest.getContent());
                        //luu thong bao
                        messageNotifyService.create(mn);
                        //gui thong bao sse
                        sseService.sendNotification(sendMessageRequest.getReceive_email(), mn);
                        //update last message
                        conversationService.updatePreviewonversation(sendMessageRequest.getRoom_id(),sendMessageRequest.getSend_email(),sendMessageRequest.getContent());

                        //luu tin nhan
                        messageService.createMessageFromRequest(sendMessageRequest);
                    }
                    System.out.println("bat dau gui anh");
                    String sende=sendMessageRequest.getSend_email();
                    //gui anh
                    System.out.println(url);
                    sendMessageRequest.set_image(true);
                    sendMessageRequest.setContent(url);
                    sendMessageRequest.setImage_url(url);
                    messagingTemplate.convertAndSend("/friend/" + sendMessageRequest.getReceive_email(), sendMessageRequest);
                    sendMessageRequest.setSend_email("Server");
                    messagingTemplate.convertAndSend("/friend/" + sende, sendMessageRequest);
                    MessageNotify mn=new MessageNotify();
                    mn.setSendFrom(sende);
                    mn.setSendTo(sendMessageRequest.getReceive_email());
                    mn.setContent("Đã gửi 1 ảnh");
                    //luu thong bao
                    messageNotifyService.create(mn);
                    //gui thong bao sse
                    sseService.sendNotification(sendMessageRequest.getReceive_email(), mn);
                    //update last message
                    conversationService.updatePreviewonversation(sendMessageRequest.getRoom_id(),sendMessageRequest.getSend_email(),"Đã gửi 1 ảnh");

                    //luu tin nhan
                    sendMessageRequest.setSend_email(sende);
                    messageService.createMessageFromRequest(sendMessageRequest);

                }


            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
    @MessageMapping("/typing")
    public void typing(@Payload TypingPayload typingPayload) {
        System.out.println(typingPayload);
        messagingTemplate.convertAndSend("/typing/" + typingPayload.getEmailReceive(), typingPayload);
    }

//    @MessageMapping("/personnalmessage")
//    @SendToUser("/queue/personnalmessage")
//    public String reply(@Payload String message,
//                        Principal user) {
//        System.out.println("goi personnalmessage");
//        //System.out.println(SecurityContextHolder.getContext().getAuthentication().getName());
//        return message;
//    }

    public static MultipartFile convert(String base64, String fileName, String contentType) throws IOException {
        if (base64.contains(",")) {
            base64 = base64.split(",")[1];
        }

        byte[] fileBytes = Base64.getDecoder().decode(base64);

        // Tạo MultipartFile từ byte[]
        return new MockMultipartFile(fileName, fileName, contentType, fileBytes);
    }
}

