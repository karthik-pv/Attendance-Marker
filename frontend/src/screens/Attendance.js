import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  baseUrl,
  getAllTeachers,
  getClassesForTeacher,
  getSubjectsForTeacher,
} from "../urls/Urls";
import "../index.css";

const Attendance = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(baseUrl + getAllTeachers);
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (selectedTeacher) {
      const fetchClasses = async () => {
        try {
          const response = await axios.get(
            baseUrl + getClassesForTeacher + `?id=${selectedTeacher}`
          );
          setClasses(response.data);
        } catch (error) {
          console.error("Error fetching classes:", error);
        }
      };
      const fetchSubjects = async () => {
        try {
          const response = await axios.get(
            baseUrl + getSubjectsForTeacher + `?id=${selectedTeacher}`
          );
          setSubjects(response.data);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        }
      };

      fetchClasses();
      fetchSubjects();
    } else {
      setClasses([]);
      setSubjects([]);
    }
  }, [selectedTeacher]);

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
    setSelectedClass("");
    setSelectedSubject("");
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="text-black font-bold text-2xl mb-4">
          Manage Attendance
        </h2>
        <form className="flex flex-col gap-4">
          <div className="dropdown-section mb-4">
            <select
              value={selectedTeacher}
              onChange={handleTeacherChange}
              className="dropdown"
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          <div className="dropdown-section mb-4">
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="dropdown"
              disabled={!selectedTeacher}
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div className="dropdown-section mb-4">
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="dropdown"
              disabled={!selectedTeacher}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Attendance;
