package com.attendance.attendance_marker.entities;

import lombok.*;

import java.util.Set;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClassroomRequestBody {

    public String id;

    public String name;

    public Set<String> students;
}
