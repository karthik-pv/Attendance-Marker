package com.attendance.attendance_marker.repositories;

import com.attendance.attendance_marker.entities.Classroom;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClassroomRepository extends CrudRepository<Classroom , String> {
    Optional<Classroom> findByName(String name);
}
