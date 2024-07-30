import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  baseUrl,
  createClass,
  editClass,
  getAllClasses,
  getAllStudents,
} from "../urls/Urls";

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
    <div className="flex flex-col items-center justify-center h-full min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-black font-bold text-2xl mb-4">Add / Edit Class</h2>
        <form className="flex flex-col gap-4">
          <div className="mb-4">
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="w-full py-3 px-4 border border-gray-600 rounded-md bg-gray-900 text-white"
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
            className="w-full py-3 px-4 border border-gray-600 rounded-md bg-gray-900 text-white"
          />
          <div className="mb-4">
            <span className="block text-white font-semibold mb-2">
              Select Students
            </span>
            {students.map(({ id, name }) => (
              <label key={id} className="block text-white mb-2">
                <input
                  type="checkbox"
                  value={id}
                  checked={selectedStudents.includes(id)}
                  onChange={() => handleStudentChange(id)}
                  className="mr-2"
                />
                {name}
              </label>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => handleSubmit("create")}
              className="py-3 px-6 bg-green-600 text-white font-semibold rounded-md transition-colors duration-300 hover:bg-green-700"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("edit")}
              className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-md transition-colors duration-300 hover:bg-blue-700"
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
