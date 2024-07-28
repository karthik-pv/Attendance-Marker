package com.attendance.attendance_marker.services;

import com.attendance.attendance_marker.entities.Classroom;
import com.attendance.attendance_marker.entities.ClassroomRequestBody;
import com.attendance.attendance_marker.entities.Student;
import com.attendance.attendance_marker.repositories.ClassroomRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class ClassroomService {

    @Autowired
    private ClassroomRepository repository;

    @Autowired
    private StudentService studentService;

    public Classroom createClassroom(ClassroomRequestBody data){
        Classroom newClass = new Classroom();
        newClass.name = data.getName();
        try {
            repository.save(newClass);
            addStudentsToClassroom(data);
            return newClass;
        }
        catch(Exception e){
            throw new RuntimeException("Something went wrong " + e.getMessage());
        }
    }

    public Iterable<Classroom> getAllClassrooms(){
        try {
            return repository.findAll();
        }
        catch(Exception e){
            throw new RuntimeException(("Something went wrong ") + e.getMessage());
        }
    }

    @Transactional
    public Classroom addStudentsToClassroom(ClassroomRequestBody data) {
        Optional<Classroom> classToUpdateOpt = repository.findByName(data.name);

        System.out.println(classToUpdateOpt.isPresent());
        if (!classToUpdateOpt.isPresent()) {
            return null;
        }

        Classroom classToUpdate = classToUpdateOpt.get();
        Set<Student> studentsInClass = new HashSet<>();

        data.students.forEach(studentId -> {
            Optional<Student> studentOpt = studentService.getStudent(studentId);
            studentOpt.ifPresent(studentsInClass::add);
        });

        classToUpdate.setStudents(studentsInClass);
        Classroom updatedClass = repository.save(classToUpdate);

        return updatedClass;
    }

    public Iterable<Student> getStudentsInClassroom(String classroomId){
        try {
            Optional<Classroom> classroom = repository.findById(classroomId);
            return classroom.<Iterable<Student>>map(Classroom::getStudents).orElse(null);
        }
        catch (Exception e){
            throw new RuntimeException("Something went wrong " + e.getMessage());
        }
    }

    @Transactional
    public Classroom editClassroom(ClassroomRequestBody data) {
        try {
            // Fetch the classroom by ID
            Optional<Classroom> classroomOpt = repository.findById(data.getId());

            // Check if the classroom exists
            if (classroomOpt.isPresent()) {
                Classroom toEditClassroom = classroomOpt.get();

                // Update the classroom's name
                toEditClassroom.setName(data.getName());

                // Fetch and update students
                Set<Student> studentsInClass = new HashSet<>();
                data.getStudents().forEach(studentId -> {
                    Optional<Student> studentOpt = studentService.getStudent(studentId);
                    studentOpt.ifPresent(studentsInClass::add);
                });

                // Update students in the classroom
                toEditClassroom.setStudents(studentsInClass);

                // Save the updated classroom
                return repository.save(toEditClassroom);
            } else {
                return null; // Classroom not found
            }
        } catch (Exception e) {
            throw new RuntimeException("Error updating classroom: " + e.getMessage());
        }
    }

    public Classroom getClassroomById(String id){
        try{
            Optional<Classroom> classroom = repository.findById(id);
            if(classroom.isPresent()){
                return classroom.get();
            }
            else{
                return null;
            }
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

}
