import React from "react";
import "./App.css";
import { IoIosChatbubbles } from "react-icons/io";
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
            }}
          >
            <a href="#">Login</a>
          </div>
        </div>
        <form action="">
          <input
            type="text"
            name="usernamw"
            id="username"
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
          <div
            className="login"
            onClick={() => {
              //   window.location = "/Chat";
            }}
          >
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
