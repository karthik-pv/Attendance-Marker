import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center">
      <Header />
      <div className="flex flex-col gap-4 justify-center">
        <Link to={"/teachers"}>
          <button className="btn">Add / Edit Teacher</button>
        </Link>
        <Link to={"/classes"}>
          <button className="btn">Add / Edit Class</button>
        </Link>
        <Link to={"/subjects"}>
          <button className="btn">Add / Edit Subject</button>
        </Link>
        <Link to={"/attendance"}>
          <button className="btn btn-large">Take Attendance</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
