package com.attendance.attendance_marker.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "students" , uniqueConstraints = @UniqueConstraint(columnNames = "USN"))
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String id;

    @Column(nullable = false)
    public String name;

    @Column(nullable = false , unique = true)
    public String usn;

    @Column(nullable = false)
    public String email;
}
