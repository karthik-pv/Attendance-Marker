import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  baseUrl,
  createClass,
  editClass,
  getAllClasses,
  getAllStudents,
} from "../urls/Urls";
import "../index.css";

const Classes = () => {
  const [name, setName] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get(baseUrl + getAllStudents);
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await axios.get(baseUrl + getAllClasses);
      setClasses(response.data);
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      const selectedClassData = classes.find((cls) => cls.id === selectedClass);
      if (selectedClassData) {
        setName(selectedClassData.name || ""); // Set the name field
        setSelectedStudents(
          selectedClassData.students.map((student) => student.id) || []
        );
      }
    } else {
      setName(""); // Clear the name field if no class is selected
      setSelectedStudents([]); // Clear selected students if no class is selected
    }
  }, [selectedClass, classes]);

  const handleStudentChange = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id)
        ? prev.filter((studentId) => studentId !== id)
        : [...prev, id]
    );
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSubmit = async (action) => {
    const classData = {
      name: name,
      students: selectedStudents,
    };

    try {
      if (action === "edit") {
        classData.id = selectedClass;
        console.log("Editing class with data:", classData);
        const response = await axios.post(baseUrl + editClass, classData, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("Class updated successfully", response.data);
      } else if (action === "create") {
        console.log("Creating class with data:", classData);
        const response = await axios.post(baseUrl + createClass, classData, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("Class created successfully", response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="text-black font-bold text-2xl mb-4">Add / Edit Class</h2>
        <form className="flex flex-col gap-4">
          <div className="select-class-section mb-4">
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="dropdown"
            >
              <option value="">Select Existing Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="Class Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <div className="checkbox-group">
            <span className="checkbox-header">Select Students</span>
            {students.map(({ id, name }) => (
              <label key={id} className="checkbox-label">
                <input
                  type="checkbox"
                  value={id}
                  checked={selectedStudents.includes(id)}
                  onChange={() => handleStudentChange(id)}
                  className="checkbox"
                />
                {name}
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

export default Classes;
