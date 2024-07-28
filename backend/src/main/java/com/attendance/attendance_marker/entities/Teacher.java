package com.attendance.attendance_marker.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Data
@Table(name = "teachers" , uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String id;

    @Column
    public String name;

    @Column
    public String email;

    @Column
    public Set<String> classes;

    @Column
    public Set<String> subjects;

}
