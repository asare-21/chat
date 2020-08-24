import React from "react";
import "./App.css";
import { IoIosChatbubbles } from "react-icons/io";
import openSocket from "socket.io-client";
const socket = openSocket(
  `${window.location.protocol}//${window.location.hostname}:4000`,
  {
    secure: true,
  }
);
function Home() {
  return (
    <div>
      <div className="home_body">
        <div className="logo">
          <div className="circle">
            <div className="smallCirlce">
              <IoIosChatbubbles id="circle-icon" />
            </div>
          </div>
          <h3>
            Welcome to Paradise
            <p>This is where you are meant to be!</p>
          </h3>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>

          <div
            className="login"
            id="login"
            onClick={() => {
              document.querySelector("form").classList.toggle("show");
              document.querySelector("#login").classList.toggle("show");
              // window.location = "/Chat";
            }}
          >
            <a href="#">Login</a>
          </div>
        </div>
        <form
          action=""
          onSubmit={(event) => {
            event.preventDefault();
            socket.emit("users", event.target.querySelector("#username").value);
          }}
        >
          <input
            type="tel"
            name="username"
            id="username"
            placeholder="Phone Number"
            required
          />
          {/* <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          /> */}
          <div className="login">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

socket.on("found", (found) => {
  console.log(found);
  localStorage.setItem("user", found);
  if (localStorage.getItem("name") !== "") {
    window.location = "/Chat";
  }
});

export default Home;
