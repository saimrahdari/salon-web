import React, {  useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useContext } from "react";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import { useState } from "react";
import "../styles/table.css";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillCaretDown } from "react-icons/ai";
import filterImage from "../assets/filterImage.png";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  getFirestore,  query  
} from "firebase/firestore";
import { db } from "../firebase";
import { GlobalContext } from "../contexts/globalState";
import axios from 'axios';


const Table = (props) => {
  const navigate = useNavigate();
  const { locations } = useContext(GlobalContext);
  const [location, setLocation] = useState("");
  console.log(locations)
  const acceptordecline = async (uid) => {
    console.log(uid);
    // var axios = require('axios');

    const ref = doc(db, "upcoming_bookings", uid[0]);
    const userref = doc(db, "users", uid[2])
    const userdata = await getDoc(userref);
    const dataa = userdata.exists() ? userdata.data() : null
    const fcmToken = dataa.token;
    
    let dataArray = {};
    if (uid[1] === "true") {

      var data = JSON.stringify({
        "to": fcmToken,
        "notification": {
          "body": "Booking Accepted",
          "title": `Your booking ${uid[3]} has been accepted`
        }
      });
      
      
      
      await axios.post('https://fcm.googleapis.com/fcm/send', data, {
        headers: {
          'Authorization': 'Bearer AAAA8sCkv1U:APA91bEAxbnwAtCYNSldYKJpp3WFVok4g2HYl4Hcs7OgtVBqqCUiIB0-pTPmbsr9a6gko1hUdechpzcwiAzSEfSfjxv7CMeZ1iV4laRLywizbsOGuHxl_jyXKwaDUVQqq-h7iassCbBL', 
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

      
      dataArray = {
        isApprroved: true,
      };
      alert("Approved");
     
    }
    if (uid[1] === "false") {
      

      var data = JSON.stringify({
        "to": fcmToken,
        "notification": {
          "body": "Booking Declined",
          "title": `Your booking ${uid[3]} has been declined`
        }
      });
      
      // var config = {
      //   method: 'post',
      //   url: 'https://fcm.googleapis.com/fcm/send',
      //   headers: { 
      //     'Authorization': 'Bearer AAAA8sCkv1U:APA91bEAxbnwAtCYNSldYKJpp3WFVok4g2HYl4Hcs7OgtVBqqCUiIB0-pTPmbsr9a6gko1hUdechpzcwiAzSEfSfjxv7CMeZ1iV4laRLywizbsOGuHxl_jyXKwaDUVQqq-h7iassCbBL', 
      //     'Content-Type': 'application/json'
      //   },
      //   data : data
      // };

      await axios.post('https://fcm.googleapis.com/fcm/send', data, {
        headers: {
          'Authorization': 'Bearer AAAA8sCkv1U:APA91bEAxbnwAtCYNSldYKJpp3WFVok4g2HYl4Hcs7OgtVBqqCUiIB0-pTPmbsr9a6gko1hUdechpzcwiAzSEfSfjxv7CMeZ1iV4laRLywizbsOGuHxl_jyXKwaDUVQqq-h7iassCbBL', 
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      
      
      dataArray = {
        isApprroved: false,
      };
      alert("Declined");
      
    }

    try {
      await updateDoc(ref, dataArray);
    } catch (err) {
      console.log(err);
    }
    window.location.reload(true);
  };

  return (
    <div>
      <div className="table-header" style={props.style}>
        <h2>{props.title}</h2>

        <div className="container">
          <div
            className="center-container"
            style={{ width: "100%", justifyContent: "right" }}
          >
            {props.default ? (
              <div className="location">
                Default <AiFillCaretDown className="icon small" />
              </div>
            ) : (
              ""
            )}
            <div className="center-container">
              <div
                className="location"
                style={{
                  height: "fit-content",
                  width: "fit-content",
                  borderRadius: 25,
                }}
              >
                {/* <HiLocationMarker className="icon" /> Location: All
              <AiFillCaretDown className="icon small" /> */}
                <label className="block mx-2 text-sm font-medium">
                  {" "}
                  Branch:{" "}
                </label>
                <select
                  className="block p-2 m-1 max-w-sm text-sm outline-none"
                  style={{
                    backgroundColor: "rgba(52, 52, 52, 0)",
                    border: "0 !important",
                    boxShadow: "0 !important",
                    border: "0 !important",
                   cursor:'pointer',
                  }}
                  onChange={(e) => {
                    if (e.target.value == "All") {
                      setLocation("");
                    } else {
                      setLocation(e.target.value);
                    }
                  }}
                >
                  <option >All</option>
                  {locations.map((val,ind)=><option>{val.data.branch}</option>)}
                </select>
              </div>
              <img src={filterImage} alt=""></img>
            </div>
          </div>
        </div>
      </div>
      <div className="table w-full">
        <table>
          <tr style={{ backgroundColor: "transparent" }}>
            <th>Name</th>
            <th>Service</th>
            <th>Time</th>
            <th>Stylist</th>
            <th>City</th>
            <th>Approval</th>
          </tr>

          {props.data.map((item) => {
            if (item.data.City == location || location == "") {
              return (
                <tr>
                  <td>
                    <div className="name">
                      <ProfilePicture
                        imgStyle={{
                          width: "50px",
                          height: "50px",
                          marginRight: "15px",
                        }}
                      />
                      {item.data.name}
                    </div>
                  </td>
                  <td>{item.data.service.name}</td>
                  <td>{item.data.time}</td>
                  <td>{item.data.stylist}</td>
                  <td>{item.data.City}</td>
                  <td>
                    {props.title === "Pending Approvals" ||  props.title === "Pending Bookings"? (
                      <button
                        className="accept"
                        onClick={() => acceptordecline([item.id, "true", item.data.uid, item.data.name])}
                        style={{cursor:'pointer'}}
                      >
                        Approve
                      </button>
                    ) : (
                      <div></div>
                    )}
                    {props.title === "Pending Approvals" ||  props.title === "Pending Bookings" ? (
                      <button
                        className="decline"
                        onClick={() => acceptordecline([item.id, "false", item.data.uid, item.data.name])}
                        style={{cursor:'pointer'}}
                      >
                        Decline
                      </button>
                    ) : (
                      <div></div>
                    )}
                    <div className="dropdown details">
                      <HiDotsHorizontal style={{cursor:'pointer'}}/>
                      <div className="dropdown-content">
                        <div
                          onClick={() => {
                            console.log("going");
                            navigate("/booking-details", {
                              replace: true,
                              state: { id: item.id },
                            });
                          }}
                        >
                          <IoPencil className="icon" />
                          Details
                        </div>
                        <div>
                          <FaTrash className="icon" /> Delete
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            }
          })}
        </table>
      </div>
    </div>
  );
};

export default Table;
