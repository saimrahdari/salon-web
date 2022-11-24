import React, { useState, useEffect } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { useContext } from "react";
import { GlobalContext } from "../contexts/globalState";
import "../styles/locations.css";
import Modal from "../components/Modal";
import InputField from "../components/InputField";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query,
  arrayUnion,
} from "firebase/firestore";
import DropdownMenu from "../components/DropdownMenu";

export default function Locations(props) {
  const { locations } = useContext(GlobalContext);
  const addreflocation = collection(db, "location");

  const [show, setShow] = useState(false);
  const hideModal = () => setShow(false);

  const [show1, setShow1] = useState(false);
  const hideModal1 = () => setShow1(false);

  const [show2, setShow2] = useState(false);
  const hideModal2 = () => setShow2(false);

  const [locationshow, setlocationshow] = useState(false);
  const locationshowset = () => setlocationshow(false);

  const [selected, setselected] = useState(["Select Location"]);
  const [City, setCity] = useState("");
  const [Street, setStreet] = useState("");

  const [loc, setloc] = useState([]);
  const [book, setbook] = useState([]);
  const addcity = (e) => setCity(e.target.value);
  const addstreet = (e) => setStreet(e.target.value);

  const addlocation = async () => {
    const addData = await addDoc(addreflocation, {
      branch: City,
    }).catch((err) => {
      console.log(err);
    });
    hideModal();
    window.location.reload(true);
  };
  const updatelocation = async () => {
    const ref=doc(db,"location",selected[1])
    const addData = await updateDoc(ref, {
      street: arrayUnion(Street),
    }).catch((err) => {
      console.log(err);
    });
    locationshowset();
    window.location.reload(true);
  };

  const filterBooking = async (location) => {
    console.log(location);
    const ref = collection(db, "upcoming_bookings");
    const q = query(ref, where("City", "==", location));
    const querySnapshot = await getDocs(q);
    setbook(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(loc);
  };

  const filterStylistLocation = async (location) => {
    console.log(location);
    const ref = collection(db, "stylist");
    const q = query(ref, where("City", "==", location));
    const querySnapshot = await getDocs(q);
    setloc(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(loc);
  };

console.log(selected)
  return (
    <div className="locations">
      <div className="location-header">
        <h2 >Branch</h2>
        {/* <button
          style={{ marginLeft: 900 }}
          onClick={() => setlocationshow(true)}
        >
          Add Branch Location
        </button> */}
        <button style={{cursor:'pointer'}} onClick={() => setShow(true)}>Add Branch </button>

        <Modal
          title="Branch"
          show={show}
          hideModal={hideModal}
          contentStyle={{ height: "350px" }}
        >
          <div className="picture-container">
            {/* <div className="add-picture"></div> */}

            <span>Enter Details</span>
          </div>
          <div className="input-fields-container" style={{ marginTop: "40px" }}>
            <InputField
              icon={HiLocationMarker}
              fieldStyle={{ height: "50px", width: "180px" }}
              placeholder="Enter Branch Name"
              value={City}
              changeHandler={addcity}
            />
          </div>
          <button style={{cursor:'pointer'}} className="update-stylist-detail" onClick={addlocation}>
            Add Branch
          </button>
        </Modal>


          {/* <div className="input-fields-container" style={{ marginTop: "40px" }}>
          <DropdownMenu title={selected[0]}>
              {locations.map((item, ind) => {
                return (
                  <div key={ind} onClick={() => setselected([item.data.city,item.id])}>
                    {item.data.city}
                  </div>
                );
              })}
            </DropdownMenu>
            <InputField
              icon={HiLocationMarker}
              fieldStyle={{ height: "50px", width: "180px" }}
              placeholder="Enter Street Name"
              value={Street}
              changeHandler={addstreet}
            />
          </div> */}
          {/* <button className="update-stylist-detail" onClick={updatelocation}>
            Add Branch
          </button> */}



        <Modal
          title="Branch"
          show={show1}
          hideModal={hideModal1}
          contentStyle={{ height: "350px" }}
        >
          <div className="picture-container">
            {/* <div className="add-picture"></div> */}
            <span style={{color:'white'}}>Stylists Present Here {loc.length}</span>
          </div>
          <div className="input-fields-container" style={{ marginTop: "40px" }}>
            {loc.map((val, ind) => {
              console.log(val);
              return (
                <div style={{ display: "flex", width: "300px",color:'#E6B970' }}>
                  <h3 style={{ marginRight: 30 }}>Name: {val.name}</h3>
                  <h3>Branch: {val.City}</h3>
                </div>
              );
            })}
          </div>
        </Modal>

        <Modal
          title="Branch"
          show={show2}
          hideModal={hideModal2}
          contentStyle={{ height: "350px", width: "650px" }}
        >
          <div className="picture-container">
            {/* <div className="add-picture"></div> */}
            <span style={{color:'white'}}>Bookings {book.length}</span>
          </div>
          <div className="input-fields-container" style={{ marginTop: "40px" }}>
            {book.map((val, ind) => {
              console.log(val);
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "600px",
                    color:'#E6B970'
                  }}
                >
                  <h3 style={{ marginRight: 30 }}>Name: {val.name}</h3>
                  <h3 style={{ marginRight: 30 }}>City: {val.City}</h3>
                  <h3>Stylist Booked: {val.stylist}</h3>
                </div>
              );
            })}
          </div>
        </Modal>
      </div>
      {locations.map((item) => {
        // let st=item.data.street;
        return (
          <div className="location-item" key={item.id}>
            <div className="address">
              <HiLocationMarker className="icon" />
              <p>
              Branch {item.data.branch}
              </p>
              {/* { st.map((val,ind) =><p key={ind}>, Branch {val}</p>)} */}
            </div>
            <div className="actions">
              <button
              style={{cursor:'pointer'}}
                onClick={() => {
                  filterBooking(item.data.branch);
                  setShow2(true);
                }}
              >
                View Bookings
              </button>
              <button
              style={{cursor:'pointer'}}
                onClick={() => {
                  filterStylistLocation(item.data.branch);
                  setShow1(true);
                  
                }}
              >
                View Stylists
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
