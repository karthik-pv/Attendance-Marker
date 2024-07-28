package com.attendance.attendance_marker.repositories;

import com.attendance.attendance_marker.entities.Teacher;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends CrudRepository<Teacher,String> {
}
