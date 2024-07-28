package com.attendance.attendance_marker.controllers;

import com.attendance.attendance_marker.entities.Classroom;
import com.attendance.attendance_marker.entities.ClassroomRequestBody;
import com.attendance.attendance_marker.entities.Student;
import com.attendance.attendance_marker.services.ClassroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("classroom")
@CrossOrigin()
public class ClassroomController {

    @Autowired
    private ClassroomService service;

    @PostMapping("/createClassroom")
    public ResponseEntity<Classroom> createClassroom(@RequestBody ClassroomRequestBody data){
        return ResponseEntity.ok(service.createClassroom(data));
    }

    @GetMapping("/getAllClassrooms")
    public ResponseEntity<Iterable<Classroom>> getAllClassrooms(){
        return ResponseEntity.ok(service.getAllClassrooms());
    }

    @PostMapping("/addStudentsToClassroom")
    public ResponseEntity<Classroom> addStudentsToClassroom(@RequestBody ClassroomRequestBody data){
        return ResponseEntity.ok(service.addStudentsToClassroom(data));
    }

    @GetMapping("/getStudentsInClassroom")
    public ResponseEntity<Iterable<Student>> getStudentsInClassroom(@RequestParam String id){
        return ResponseEntity.ok(service.getStudentsInClassroom(id));
    }

    @PostMapping("/editClassroom")
    public ResponseEntity<Classroom> editClassroom(@RequestBody ClassroomRequestBody data){
        return ResponseEntity.ok(service.editClassroom(data));
    }

}
