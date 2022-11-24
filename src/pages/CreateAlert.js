import React, { useState, useEffect } from "react";
import { IoIosListBox } from "react-icons/io";
import { getMessaging } from "firebase/messaging";

export default function CreateAlert() {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const SendNotification = async () => {
    const topic = 'highScores';

    const message = {
      data: {
        score: '850',
        time: '2:45'
      },
      topic: topic
    };

    // Send a message to devices subscribed to the provided topic.
    getMessaging().send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  };

  return (
    <>
      <div className="users ">
        <div className="flexing">
          <h2>Create Alert</h2>
        </div>
        <div className="search-bar">
          <IoIosListBox className="icon" />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title here"
          />
        </div>
        <br></br>
        <div className="search-bar">
          <IoIosListBox className="icon" />
          <input
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter Notification here"
          />
        </div>
        
          
        <button style={{cursor:'pointer'}} className="add-user-btn" onClick={SendNotification}>
            Send Notification
          </button>

      </div>
    </>
  );
}
