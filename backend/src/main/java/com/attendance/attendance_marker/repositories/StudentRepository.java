package com.attendance.attendance_marker.repositories;

import com.attendance.attendance_marker.entities.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends CrudRepository<Student , String> {
}
