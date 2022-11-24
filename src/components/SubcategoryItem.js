import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import "../styles/subcategoryItem.css";
import ProfilePicture from "./ProfilePicture";
import { db } from "../firebase";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { GlobalContext, useGlobalState } from "../contexts/globalState";
import Modal from "../components/Modal";
import InputField from "../components/InputField";

const SubCategoryItem = ({ item, uid, style }) => {
  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const updateName = (e) => setName(e.target.value);
  const updateprice = (e) => setprice(e.target.value);

  const { deletecategory } = useGlobalState();
  const deletesubcat = async (id) => {
    const ref = doc(db, "category", id[2]);
    let index = {
      name: id[0],
      price: id[1],
    };
    try {
      const subcategory = await updateDoc(ref, {
        subcategories: arrayRemove(index),
      });
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  const eidt = async (id) => {
    console.log(id);
    const ref = doc(db, "category", id[2]);
    let dataindex = {
      name: id[0],
      price: id[1],
    };
    try {
      const subcategory = await updateDoc(ref, {
        subcategories: arrayRemove(dataindex),
      });
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }


    let index = {
      name: name,
      price: price,
    };
    console.log(index);
    try {
      const subcategory = await updateDoc(ref, {
        subcategories: arrayUnion(index),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [showCatModal, setShowCatModal] = useState(false);
  const hideCatModal = () => setShowCatModal(false);
  return (
    <>
      <div className="subcategory-item" style={style}>
        <div className="subdescription-container">
          {/* <div className="subcategory-picture"></div> */}
          {/* <ProfilePicture
          imgStyle={{
            width: "29px",
            height: "29px",
            marginRight: "15px",
            borderRadius: "6px",
          }}
        /> */}
          <div className="subcategory-description">
            <span>{item.name}</span>
            <div>
              ${item.price}
              {/* <div className="circle"></div> <div style={{fontSize: '10px', fontWeight: '400'}} >Hair Serivce</div> */}
            </div>
          </div>
        </div>
        <div className="subcategory-buttons-container">
          <FaTrash
            className="icon"
            style={{ cursor: "pointer" }}
            onClick={() => deletesubcat([item.name, item.price, uid])}
          />
          <IoPencil
            className="icon"
            style={{ cursor: "pointer" }}
            onClick={() => setShowCatModal(true)}
          />
        </div>
      </div>

      <Modal
        title="Edit A Category"
        show={showCatModal}
        hideModal={hideCatModal}
        contentStyle={{ height: "350px" }}
      >
        {/* <div className="picture-container">
          <ProfilePicture imgStyle={{ width: "45px", height: "45px" }} />
          <span>Update picture</span>
        </div> */}
        <div className="input-container" style={{ marginTop: 90 }}>
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder="Enter Name"
            value={name}
            changeHandler={updateName}
          />
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder="Enter Price"
            value={price}
            changeHandler={updateprice}
          />
        </div>
        <button
          className="update-stylist-detail"
          style={{ margin: "10px 20px" ,cursor:'pointer'}}
          onClick={() => eidt([item.name, item.price, uid])}
        >
          Update
        </button>
      </Modal>
    </>
  );
};

export default SubCategoryItem;
