package com.attendance.attendance_marker.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "classrooms")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Classroom {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String id;

    @Column(nullable = false , unique = true)
    public String name;

    @ManyToMany
    @JoinTable(
            name = "classroom_students",
            joinColumns = @JoinColumn(name = "classroomId"),
            inverseJoinColumns = @JoinColumn(name = "studentId")
    )
    private Set<Student> students = new HashSet<>();

}
