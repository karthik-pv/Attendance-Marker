package com.attendance.attendance_marker.repositories;

import com.attendance.attendance_marker.entities.Attendance;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepository extends CrudRepository<Attendance,String> {
    Iterable<Attendance> findByStudentIdAndSubjectId(String studentId , String subjectId);
    Iterable<Attendance> findByClassIdAndSubjectId(String classId , String subjectId);
}
