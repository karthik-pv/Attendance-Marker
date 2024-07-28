package com.attendance.attendance_marker.controllers;

import com.attendance.attendance_marker.entities.Student;
import com.attendance.attendance_marker.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService service;

    @PostMapping("/addStudent")
    public ResponseEntity<Student> createStudent(@RequestBody Student student){
        return ResponseEntity.ok(service.createStudent(student));
    }

    @GetMapping("/getStudent")
    public ResponseEntity<Student> getStudent(@RequestParam String id){
        Optional<Student> student = service.getStudent(id);
        return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/getAllStudents")
    public ResponseEntity<Iterable<Student>> getAllStudents(){
        Iterable<Student> students = service.getAllStudents();
        return ResponseEntity.ok(students);
    }
}
