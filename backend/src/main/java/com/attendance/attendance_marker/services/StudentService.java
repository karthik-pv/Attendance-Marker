package com.attendance.attendance_marker.services;

import com.attendance.attendance_marker.entities.Student;
import com.attendance.attendance_marker.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public Student createStudent(Student data){
        Student student = new Student();
        student.name = data.name;
        student.usn = data.usn;
        student.email = data.email;
        try {
            return repository.save(student);
        } catch (DataIntegrityViolationException e) {
            // Handle the exception, possibly logging and/or rethrowing
            throw new RuntimeException("Student with USN " + data.usn + " already exists");
        }
    }

    public Optional<Student> getStudent(String id){
        try {
            return repository.findById(id);
        }
        catch(Exception e) {
            throw new RuntimeException("Something went wrong - " + e.getMessage());
        }
    }

    public Iterable<Student> getAllStudents(){
        try{
            return repository.findAll();
        }
        catch(Exception e){
            throw new RuntimeException("Something went wrong - " + e.getMessage());
        }
    }

}
