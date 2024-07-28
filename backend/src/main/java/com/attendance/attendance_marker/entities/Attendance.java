package com.attendance.attendance_marker.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@Table(name = "attendance")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String id;

    @Column(name = "studentId")
    public String studentId;

    @Column(name = "subjectId")
    public String subjectId;

    @Column(name = "classId")
    public String classId;

    @Column(name = "date")
    public LocalDate date;

    @Column(name = "status")
    public Boolean status;

}
