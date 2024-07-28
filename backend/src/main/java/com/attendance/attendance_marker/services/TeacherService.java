package com.attendance.attendance_marker.services;

import com.attendance.attendance_marker.entities.Classroom;
import com.attendance.attendance_marker.entities.Subject;
import com.attendance.attendance_marker.entities.Teacher;
import com.attendance.attendance_marker.repositories.SubjectRepository;
import com.attendance.attendance_marker.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository repository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private ClassroomService classroomService;

    public Teacher createTeacher(Teacher data){
        Teacher teacher = new Teacher();
        teacher.name = data.name;
        teacher.email = data.email;
        teacher.classes = data.classes;
        teacher.subjects = data.subjects;
        try{
            return repository.save(teacher);
        }
        catch(Exception e){
            throw new RuntimeException("Something went wrong " + e.getMessage());
        }
    }

    public Iterable<Subject> getSubjectsOfTeacher(String id) {
        try {
            Optional<Teacher> teacher = repository.findById(id);
            Set<Subject> subjects = new HashSet<>();
            if (teacher.isPresent()) {
                for (String subjectId : teacher.get().subjects) {
                    subjects.add(subjectRepository.findById(subjectId).get());
                }
            }
            return subjects;
        }
        catch(Exception e){
            throw new RuntimeException("Something went wrong " + e.getMessage());
        }
    }

    public Iterable<Teacher> getAllTeachers(){
        try{
            return repository.findAll();
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public Teacher editTeacher(Teacher data){
        try{
            Optional<Teacher> toEditTeacher = repository.findById(data.id);
            if(toEditTeacher.isPresent()){
                Teacher teacher = toEditTeacher.get();
                teacher.name = data.name;
                teacher.email = data.email;
                teacher.classes = data.classes;
                teacher.subjects = data.subjects;
                return repository.save(teacher);
            }
            else{
                return null;
            }
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public Iterable<Classroom> getClassesForTeacher(String id){
        try{
            Optional<Teacher> teacher = repository.findById(id);
            if(teacher.isPresent()){
                Teacher toGetTeacher = teacher.get();
                Set<Classroom> classrooms = new HashSet<>();
                for( String classroomId : toGetTeacher.getClasses()){
                    classrooms.add(classroomService.getClassroomById(classroomId));
                }
                return classrooms;
            }
            else{
                return null;
            }
        }
        catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
}
