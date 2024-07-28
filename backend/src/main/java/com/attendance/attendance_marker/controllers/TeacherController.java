package com.attendance.attendance_marker.controllers;

import com.attendance.attendance_marker.entities.Classroom;
import com.attendance.attendance_marker.entities.Subject;
import com.attendance.attendance_marker.entities.Teacher;
import com.attendance.attendance_marker.services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("teacher")
public class TeacherController {

    @Autowired
    private TeacherService service;

    @PostMapping("createTeacher")
    public ResponseEntity<Teacher> createTeacher(@RequestBody Teacher data){
        return ResponseEntity.ok(service.createTeacher(data));
    }

    @GetMapping("getSubjectsOfTeacher")
    public ResponseEntity<Iterable<Subject>> getSubjectsOfTeacher(@RequestParam String id){
        return ResponseEntity.ok(service.getSubjectsOfTeacher(id));
    }

    @GetMapping("getAllTeachers")
    public ResponseEntity<Iterable<Teacher>> getAllTeachers(){
        return ResponseEntity.ok(service.getAllTeachers());
    }

    @PostMapping("editTeacher")
    public ResponseEntity<Teacher> editTeacher(@RequestBody Teacher data){
        return ResponseEntity.ok(service.editTeacher(data));
    }

    @GetMapping("getClassesForTeacher")
    public ResponseEntity<Iterable<Classroom>>getClassesForTeacher(@RequestParam String id){
        return ResponseEntity.ok(service.getClassesForTeacher(id));
    }
}
