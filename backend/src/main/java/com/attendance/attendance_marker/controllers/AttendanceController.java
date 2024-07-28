package com.attendance.attendance_marker.controllers;

import com.attendance.attendance_marker.entities.Attendance;
import com.attendance.attendance_marker.services.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService service;

    @PostMapping("createAttendance")
    public ResponseEntity<Attendance> createAttendanceEntry(@RequestBody Attendance data){
        return ResponseEntity.ok(service.createAttendanceEntry(data));
    }

    @GetMapping("getStudentSubjectAttendance")
    public ResponseEntity<Iterable<Attendance>> getStudentSubjectAttendance(@RequestParam String studentId , @RequestParam String subjectId){
        return ResponseEntity.ok(service.getAttendanceOfStudentBySubject(studentId, subjectId));
    }

}
