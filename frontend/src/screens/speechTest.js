import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeechTest = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    const handleSpeechRecognitionEvents = () => {
      SpeechRecognition.onresult = (event) => {
        console.log("Speech recognition result:", event.results);
        const result = event.results[0][0].transcript;
        console.log("Transcript:", result);
      };

      SpeechRecognition.onend = () => {
        console.log("Speech recognition ended.");
      };

      SpeechRecognition.onerror = (error) => {
        console.error("Speech recognition error:", error);
      };
    };

    handleSpeechRecognitionEvents();
  }, []);

  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
      console.log("Started listening.");
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    console.log("Stopped listening.");
    console.log("Transcript:", transcript);
  };

  return (
    <div>
      <h1>Speech Recognition Test</h1>
      <button onClick={startListening}>Start Listening</button>
      <button onClick={stopListening}>Stop Listening</button>
      <p>Transcript: {transcript}</p>
      <button onClick={resetTranscript}>Reset Transcript</button>
    </div>
  );
};

export default SpeechTest;
