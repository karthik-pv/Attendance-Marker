package com.attendance.attendance_marker.services;

import com.attendance.attendance_marker.entities.Subject;
import com.attendance.attendance_marker.repositories.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository repository;

    public Subject createSubject(Subject data){
        Subject subject = new Subject();
        subject.name = data.name;
        try{
            return repository.save(subject);
        }
        catch(Exception e){
            throw new RuntimeException("Something went wrong " + e.getMessage());
        }
    }

    public Iterable<Subject> getAllSubjects(){
        try{
            return repository.findAll();
        }
        catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public Subject editsubject(Subject data){
        try {
            Optional<Subject> subject = repository.findById(data.id);
            if (subject.isPresent()) {
                Subject sub = subject.get();
                sub.name = data.getName();
                return repository.save(sub);
            } else {
                return null;
            }
        }
        catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
}
