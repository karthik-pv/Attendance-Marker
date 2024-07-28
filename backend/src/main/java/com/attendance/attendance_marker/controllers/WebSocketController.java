package com.attendance.attendance_marker.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public String handleMessage(String message) {
        return "Received: " + message;
    }
}
