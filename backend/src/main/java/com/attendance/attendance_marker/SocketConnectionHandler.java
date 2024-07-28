package com.attendance.attendance_marker;

import com.attendance.attendance_marker.services.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.fasterxml.jackson.databind.ObjectMapper;


@Component
public class SocketConnectionHandler extends TextWebSocketHandler {

    @Autowired
    private AttendanceService attendanceService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void
    afterConnectionEstablished(WebSocketSession session)
            throws Exception
    {

        super.afterConnectionEstablished(session);
        System.out.println(session.getId() + " Connected");

    }

    // When client disconnect from WebSocket then this
    // method is called
    @Override
    public void afterConnectionClosed(WebSocketSession session,CloseStatus status)throws Exception
    {
        super.afterConnectionClosed(session, status);
        System.out.println(session.getId() + " Disconnected");
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String payload = (String) message.getPayload();
        System.out.println("Received Payload: " + payload);
        try {
            attendanceService.parseJsonAndAddAttendance(payload);
        } catch (Exception e) {
            System.err.println("Exception while parsing and adding attendance: " + e.getMessage());
            e.printStackTrace();
        }

        super.handleMessage(session, message);
    }
}