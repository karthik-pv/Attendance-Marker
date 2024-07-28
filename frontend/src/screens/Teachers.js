import React, { useState, useEffect } from "react";
import {
  baseUrl,
  getAllTeachers,
  getAllSubjects,
  getAllClasses,
  editTeacher,
  createTeacher,
} from "../urls/Urls";
import axios from "axios";
import "../index.css";

const Teachers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await axios.get(baseUrl + getAllTeachers);
      setTeachers(response.data);
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await axios.get(baseUrl + getAllSubjects);
      setSubjects(response.data);
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await axios.get(baseUrl + getAllClasses);
      setClasses(response.data);
    };
    fetchClasses();
  }, []);

  const handleSubmit = async (action) => {
    if (action === "edit") {
      const teacher = {
        id: selectedTeacher,
        name: name,
        email: email,
        classes: selectedClasses,
        subjects: selectedSubjects,
      };
      console.log(teacher);
      await axios.post(baseUrl + editTeacher, teacher).then((response) => {
        console.log("Teacher updated successfully");
      });
    }
    if (action === "create") {
      const teacher = {
        name: name,
        email: email,
        classes: selectedClasses,
        subjects: selectedSubjects,
      };
      console.log(teacher);
      await axios.post(baseUrl + createTeacher, teacher).then((response) => {
        console.log("Teacher updated successfully");
      });
    }
  };

  const handleTeacherChange = (e) => {
    const selectedTeacherId = e.target.value;
    const teacher = teachers.find(
      (teacher) => teacher.id === selectedTeacherId
    );
    setSelectedTeacher(selectedTeacherId);
    if (teacher) {
      setName(teacher.name);
      setEmail(teacher.email);
      setSelectedClasses(teacher.classes || []);
      setSelectedSubjects(teacher.subjects || []);
    }
  };

  const handleClassChange = (id) => {
    setSelectedClasses((prev) =>
      prev.includes(id)
        ? prev.filter((classId) => classId !== id)
        : [...prev, id]
    );
  };

  const handleSubjectChange = (id) => {
    setSelectedSubjects((prev) =>
      prev.includes(id)
        ? prev.filter((subjectId) => subjectId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="font-bold text-2xl mb-4">Add / Edit Teacher</h2>
        <form className="flex flex-col gap-4">
          <div className="select-teacher-section mb-4">
            <select
              value={selectedTeacher}
              onChange={handleTeacherChange}
              className="dropdown"
            >
              <option value="">Select Existing Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <div className="checkbox-group">
            <span className="checkbox-header">Select Classes</span>
            {classes.map(({ id, name }) => (
              <label key={id} className="checkbox-label">
                <input
                  type="checkbox"
                  value={id}
                  checked={selectedClasses.includes(id)}
                  onChange={() => handleClassChange(id)}
                  className="checkbox"
                />
                {name}
              </label>
            ))}
          </div>
          <div className="checkbox-group">
            <span className="checkbox-header">Select Subjects</span>
            {subjects.map((subject) => (
              <label key={subject.id} className="checkbox-label">
                <input
                  type="checkbox"
                  value={subject.id}
                  checked={selectedSubjects.includes(subject.id)}
                  onChange={() => handleSubjectChange(subject.id)}
                  className="checkbox"
                />
                {subject.name}
              </label>
            ))}
          </div>
          <div className="button-group justify-center">
            <button
              type="button"
              onClick={() => handleSubmit("create")}
              className="button create-button"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("edit")}
              className="button edit-button"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Teachers;
