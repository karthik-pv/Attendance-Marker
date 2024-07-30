import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  baseUrl,
  getAllTeachers,
  getClassesForTeacher,
  getSubjectsForTeacher,
  websocket,
} from "../urls/Urls";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Attendance = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);

  const ws = useRef(null);
  const listeningTimeoutRef = useRef(null);
  const isListeningRef = useRef(false);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition({
      onResult: (result) => {
        console.log("Transcript result:", result);
      },
      onEnd: async () => {
        // console.log("Speech recognition ended.");
        // clearTimeout(listeningTimeoutRef.current);
        // console.log("Transcript before processing:", transcript);
        // // Process the transcript
        // await processTranscript();
        // // Reset the transcript only after processing
        // resetTranscript();
        // if (
        //   browserSupportsSpeechRecognition &&
        //   showModal &&
        //   !isListeningRef.current
        // ) {
        //   await startListening(); // Restart listening for the next student if needed
        // }
      },
      onStart: () => {
        console.log("Speech recognition started.");
      },
      onError: (error) => {
        console.error("Speech recognition error:", error);
      },
    });

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

  useEffect(() => {
    if (selectedClass) {
      const classData = classes.find((cls) => cls.id === selectedClass);
      if (classData) {
        setStudents(classData.students);
      }
    }
  }, [selectedClass, classes]);

  useEffect(() => {
    const timeControl = async () => {
      if (showModal && browserSupportsSpeechRecognition) {
        await startListening();
      }
      await SpeechRecognition.stopListening();
      resetTranscript();
    };
    timeControl();
  }, [currentStudentIndex, showModal]);

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
    setSelectedClass("");
    setSelectedSubject("");
    setStudents([]);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleStartAttendance = async () => {
    if (!selectedTeacher || !selectedClass || !selectedSubject) {
      alert(
        "Please select a teacher, class, and subject before starting attendance."
      );
      return;
    }

    setAttendance(
      students.reduce((acc, student) => {
        acc[student.id] = "absent";
        return acc;
      }, {})
    );

    ws.current = new WebSocket(websocket);

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = (message) => {
      console.log("Received WebSocket message:", message.data);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setShowModal(true);
  };

  const startListening = async () => {
    if (isListeningRef.current) return;
    isListeningRef.current = true;
    console.log("Starting speech recognition...");
    await SpeechRecognition.startListening({ continuous: true });
    listeningTimeoutRef.current = setTimeout(async () => {
      console.log("Transcript after timeout:", transcript);
      await processTranscript();
      isListeningRef.current = false;
    }, 3000);
  };

  const processTranscript = async () => {
    const resultLower = transcript.toLowerCase();
    console.log("Processing transcript:", resultLower);
    if (resultLower.includes("present")) {
      console.log(
        "Marking student as present:",
        students[currentStudentIndex].id
      );
      await handleAttendanceChange(students[currentStudentIndex].id, true);
    } else if (resultLower.includes("absent")) {
      console.log(
        "Marking student as absent:",
        students[currentStudentIndex].id
      );
      await handleAttendanceChange(students[currentStudentIndex].id, false);
    } else {
      console.log("Transcript did not include 'present' or 'absent'.");
    }
  };

  const handleAttendanceChange = async (studentId, status) => {
    const date = new Date().toISOString();
    const message = JSON.stringify({
      studentId,
      classId: selectedClass,
      subjectId: selectedSubject,
      date,
      status,
    });

    console.log("Sending attendance message:", message);

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }

    await moveToNextStudent();
  };

  const moveToNextStudent = async () => {
    console.log("Moving to next student. Current index:", currentStudentIndex);
    if (currentStudentIndex < students.length - 1) {
      setCurrentStudentIndex(currentStudentIndex + 1);
    } else {
      await handleCloseModal();
    }
  };

  const handleCloseModal = async () => {
    console.log("Closing modal and resetting state.");
    setShowModal(false);
    setStudents([]);
    setAttendance({});
    clearTimeout(listeningTimeoutRef.current);
    SpeechRecognition.stopListening();
    resetTranscript();

    if (ws.current) {
      ws.current.close();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen bg-black text-white text-center p-6">
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-white font-bold text-2xl mb-4">
          Manage Attendance
        </h2>
        <form className="flex flex-col gap-4">
          <div className="mb-4">
            <select
              value={selectedTeacher}
              onChange={handleTeacherChange}
              className="w-full py-3 px-4 border border-gray-600 rounded-md bg-gray-900 text-white"
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="w-full py-3 px-4 border border-gray-600 rounded-md bg-gray-900 text-white"
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

          <div className="mb-4">
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="w-full py-3 px-4 border border-gray-600 rounded-md bg-gray-900 text-white"
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

          <button
            type="button"
            onClick={handleStartAttendance}
            className="py-3 px-6 bg-green-600 text-white font-semibold rounded-md transition-colors duration-300 hover:bg-green-700"
          >
            Start Attendance
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg mx-auto text-center shadow-lg">
            <h2 className="text-black font-bold text-xl mb-4">
              Mark Attendance
            </h2>
            {students.length > 0 && (
              <div>
                <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4 shadow-md text-black">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">
                      {students[currentStudentIndex].name} (
                      {students[currentStudentIndex].usn})
                    </p>
                    <div>
                      <button
                        onClick={() =>
                          handleAttendanceChange(
                            students[currentStudentIndex].id,
                            true
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                      >
                        Present
                      </button>
                      <button
                        onClick={() =>
                          handleAttendanceChange(
                            students[currentStudentIndex].id,
                            false
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                      >
                        Absent
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={handleCloseModal}
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
