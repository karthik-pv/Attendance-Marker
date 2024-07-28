package com.attendance.attendance_marker.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "subject" , uniqueConstraints = @UniqueConstraint(columnNames = "name"))
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String id;

    @Column
    public String name;
}
