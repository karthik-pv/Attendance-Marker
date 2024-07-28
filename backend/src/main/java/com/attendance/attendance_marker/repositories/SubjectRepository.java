package com.attendance.attendance_marker.repositories;

import com.attendance.attendance_marker.entities.Subject;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends CrudRepository<Subject,String> {
}
