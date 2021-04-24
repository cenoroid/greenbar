import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";
//const socket = io("http://localhost:4000");
const socket = io("https://botoroid-express-app.herokuapp.com");
const App = () => {
  const [title, setTitle] = useState("this is the title");
  const [current, setCurrent] = useState(0);
  const [end, setEnd] = useState(50);
  useEffect(() => {
    socket.emit("join", "greenbar");
    socket.on("greenbardata", (data) => {
      console.log("new stuf");
      setTitle(data.title);
      setCurrent(data.current);
      setEnd(data.end);
    });
    socket.on("greenbartitle", (data) => {
      setTitle(data);
    });
    socket.on("greenbarcurrent", (data) => {
      setCurrent((prev) => prev + data);
    });
  }, []);
  return (
    <div className="container">
      <div className="border"></div>
      <div
        className="fill"
        style={{ width: (current / end) * 800 + "px" }}
      ></div>
      <div className="title">{title}</div>
      <div className="amount">
        {current}€ / {end}€{" "}
      </div>
    </div>
  );
};

export default App;
