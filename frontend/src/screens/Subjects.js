import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  baseUrl,
  createSubject,
  editSubject,
  getAllSubjects,
} from "../urls/Urls";
import "../index.css";

const Subjects = () => {
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await axios.get(baseUrl + getAllSubjects);
      setSubjects(response.data);
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      const selectedSubjectData = subjects.find(
        (sub) => sub.id === selectedSubject
      );
      if (selectedSubjectData) {
        setName(selectedSubjectData.name);
      }
    }
  }, [selectedSubject, subjects]);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleSubmit = async (action) => {
    const subjectData = {
      name: name,
    };

    try {
      if (action === "edit") {
        subjectData.id = selectedSubject;
        console.log("Editing subject:", subjectData);
        await axios.post(baseUrl + editSubject, subjectData);
        console.log("Subject updated successfully");
      } else if (action === "create") {
        console.log("Creating subject:", subjectData);
        await axios.post(baseUrl + createSubject, subjectData);
        console.log("Subject created successfully");
      }
    } catch (error) {
      console.error("Error during subject operation:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="text-black font-bold text-2xl mb-4">
          Add / Edit Subject
        </h2>
        <form className="flex flex-col gap-4">
          {/* Dropdown for Existing Subjects */}
          <div className="select-subject-section mb-4">
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="dropdown"
            >
              <option value="">Select Existing Subject</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Name Input */}
          <input
            type="text"
            placeholder="Subject Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />

          {/* Buttons */}
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

export default Subjects;
