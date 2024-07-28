package com.attendance.attendance_marker.services;

import com.attendance.attendance_marker.entities.Attendance;
import com.attendance.attendance_marker.repositories.AttendanceRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository repository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    String dateStr = "2024-07-21T18:30:00.000+00:00";

    DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

    public Attendance createAttendanceEntry(Attendance data){
        Attendance attendanceEntry = new Attendance();
        attendanceEntry.classId = data.classId;
        attendanceEntry.date = data.date;
        attendanceEntry.studentId = data.studentId;
        attendanceEntry.subjectId = data.subjectId;
        attendanceEntry.status = data.status;
        try{
            return repository.save(attendanceEntry);
        }
        catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public Iterable<Attendance> getAttendanceOfStudentBySubject(String studentId , String subjectId){
        try{
            return repository.findByStudentIdAndSubjectId(studentId,subjectId);
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public Iterable<Attendance> getAttendanceOfClassBySubject(String classId , String subjectId){
        try{
            return repository.findByClassIdAndSubjectId(classId,subjectId);
        }
        catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public Attendance parseJsonAndAddAttendance(String payload) throws JsonProcessingException {
        try{
            Attendance attendanceEntry = new Attendance();
            JsonNode jsonNode = objectMapper.readTree(payload);
            System.out.println("Parsed JSON Object: " + jsonNode);
            attendanceEntry.studentId = jsonNode.get("studentId").asText();
            OffsetDateTime offsetDateTime = OffsetDateTime.parse(jsonNode.get("date").asText(), formatter);
            attendanceEntry.date = offsetDateTime.toLocalDate();
            attendanceEntry.status = jsonNode.get("status").asBoolean();
            attendanceEntry.classId = jsonNode.get("classId").asText();
            attendanceEntry.subjectId = jsonNode.get("subjectId").asText();
            return repository.save(attendanceEntry);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

}
