import React from "react";
import "./App.css";
import {
  IoIosChatbubbles,
  IoIosContacts,
  IoIosAddCircle,
  IoIosArrowBack,
  IoIosPaperPlane,
} from "react-icons/io";
import openSocket from "socket.io-client";
const socket = openSocket(
  `${window.location.protocol}//${window.location.hostname}`,
  {
    secure: true,
  }
);
console.log(window.location);
function Chat() {
  return (
    <div>
      <div className="chat">
        <div className="navigation">
          <div className="burger">
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
          </div>
          <h4>Chats</h4>
          <div className="burger">
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
          </div>
        </div>
        <div className="chat-body">
          <div className="chats" onClick={showConversation}>
            <div className="profile-image">
              <img src="/profile.jpg" alt="profile_pic" />
            </div>
            <div className="message-info">
              <p>Joseph Asare</p>
              <small>Hi</small>
            </div>
          </div>
          <div className="conversation">
            <div className="conversation-head">
              <div className="back" onClick={showConversation}>
                <IoIosArrowBack />
              </div>
              <code>Joseph Asare</code>
            </div>
            <div className="messages">
              {/* <small>Hello,my name is Joseph Asare</small>
              <small>Okay! Whats up/</small> */}
            </div>

            <div className="input">
              <input
                type="text"
                name=""
                required
                placeholder="Type a message"
                id="message"
              />
              <button onClick={chatDeliver}>
                <IoIosPaperPlane />
              </button>
            </div>
          </div>
        </div>
        <div className="chat-circle"></div>
        <div className="chat-navigation">
          <div className="">
            {" "}
            <IoIosChatbubbles id="chat-icon" />
          </div>
          <div className="add-icon">
            <IoIosAddCircle id="add-icon" />
          </div>
          <div className=" navigation-circle">
            <IoIosContacts id="contacts-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
const showConversation = () => {
  document.querySelector(".conversation").classList.toggle("show");
};
const chatDeliver = () => {
  if (document.getElementById("message") !== null) {
    const message = document.getElementById("message").value;

    console.log(message);
    const small = document.createElement("small");
    small.textContent = message;
    small.className = "mymessage";
    if (message !== "") {
      socket.emit("message", message);
      document.querySelector(".messages").scrollTop = document.querySelector(
        ".messages"
      ).scrollHeight;
      console.log(document.querySelector(".messages").scrollHeight);

      document.querySelector(".messages").append(small);
      document.getElementById("message").value = "";
    }
  }
};
var audio = new Audio("when.mp3");
function readMsg() {
  socket.on("message", (msg) => {
    const small = document.createElement("small");
    small.textContent = msg;
    small.className = "small";
    if (msg !== "") {
      audio.play();
      document.querySelector(".messages").scrollTop = document.querySelector(
        ".messages"
      ).scrollHeight;
      document.querySelector(".messages").append(small);
    }
  });
}
readMsg();
setTimeout(chatDeliver, 1000);
export default Chat;
