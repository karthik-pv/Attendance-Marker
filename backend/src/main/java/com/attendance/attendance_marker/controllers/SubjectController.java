package com.attendance.attendance_marker.controllers;

import com.attendance.attendance_marker.entities.Subject;
import com.attendance.attendance_marker.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("subject")
public class SubjectController {

    @Autowired
    private SubjectService service;

    @PostMapping("createSubject")
    public ResponseEntity<Subject> createSubject(@RequestBody Subject data){
        return ResponseEntity.ok(service.createSubject(data));
    }

    @GetMapping("getAllSubjects")
    public ResponseEntity<Iterable<Subject>> getAllSubjects(){
        return ResponseEntity.ok(service.getAllSubjects());
    }

    @PostMapping("editSubject")
    public ResponseEntity<Subject> editSubject(@RequestBody Subject data){
        return ResponseEntity.ok(service.editsubject(data));
    }
}
