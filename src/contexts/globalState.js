import React, { createContext, useContext, useEffect, useReducer } from "react";
import { collection, getDocs, doc, deleteDoc,query,where } from "firebase/firestore";
import { db } from "../firebase";
import combineReducers from "react-combine-reducers";
import locationReducer from "./locationReducer";
import stylistsReducer from "./stylistsReducer";
import categoriesReducer from "./categoriesReducer";
import adminReducer from "./adminReducer";
import pendingBookingsReducer from "./pendingBookingsReducer";
import upcomingBookingsReducer from "./upcomingBookingsReducer";

const initialAdminState = {
  adminData: {},
};

const initialStateLocations = {
  locations: [],
};

const initialStateStylists = {
  stylists: [],
};

const initialCategories = {
  categories: [],
};

const initialStatePendingBooking = {
  pending_bookings: [],
};

const initialStateUpcomingBooking = {
  upcoming_bookings: [],
};

export const GlobalContext = createContext();

const [rootReducer, initialState] = combineReducers({
  adminState: [adminReducer, initialAdminState],
  locationsState: [locationReducer, initialStateLocations],
  stylistsState: [stylistsReducer, initialStateStylists],
  categoriesState: [categoriesReducer, initialCategories],
  pendingBookingsState: [pendingBookingsReducer, initialStatePendingBooking],
  upcomingBookingsState: [upcomingBookingsReducer, initialStateUpcomingBooking],
});

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  //Actions.
  useEffect(() => {
    const initializeAdminData = async () => {
      console.log("Loading...");
      const adminData = await getDocs(collection(db, "admin"));
      console.log("Loaded");
      dispatch({
        type: "INITIALIZE_ADMIN_DATA",
        data: adminData,
      });
    };

    const initializeData = async () => {
      const locationData = await getDocs(collection(db, "location"));
      const stylistsData = await getDocs(collection(db, "stylist"));
      const categoriesData = await getDocs(collection(db, "category"));
      const qpending = query(collection(db, "upcoming_bookings"), where("isApprroved", "==", false));
      const pendingBookingsData = await getDocs(qpending);
      const qupcomingbooking = query(collection(db, "upcoming_bookings"), where("isApprroved", "==", true));
      const upcomingBookingsData = await getDocs(qupcomingbooking);

      dispatch({
        type: "INITIALIZE_LOCATION_DATA",
        data: locationData,
      });
      dispatch({
        type: "INITIALIZE_STYLIST_DATA",
        data: stylistsData,
      });
      dispatch({
        type: "INITIALIZE_CATEGORIES_DATA",
        data: categoriesData,
      });
      dispatch({
        type: "INITIALIZE_PENDING_BOOKINGS_DATA",
        data: pendingBookingsData,
      });
      dispatch({
        type: "INITIALIZE_UPCOMING_BOOKINGS_DATA",
        data: upcomingBookingsData,
      });
    };

    initializeAdminData();
    initializeData();
  }, []);

  const addLocation = (item) => {
    dispatch({
      type: "ADD_LOCATION",
      newItem: item,
    });
  };

  const addStylist = (item) => {
    dispatch({
      type: "ADD_STYLIST",
      newItem: item,
    });
  };

  const updateStylist = (id, name) => {
    dispatch({
      type: "UPDATE_STYLIST",
      id: id,
      name: name,
    });
  };

  const deleteStylist = (id) => {
    dispatch({
      type: "DELETE_STYLIST",
      id: id,
    });
  };

  const addCategory = (item) => {
    dispatch({
      type: "ADD_CATEGORY",
      newItem: item,
    });
  };

  const addSubcategory = ( item) => {
    dispatch({
      type: "ADD_SUBCATEGORY",
      newItem: item,
    });
  };

  const updatecategory = (id, name,cattype) => {
    dispatch({
      type: "UPDATE_CATEGORY",
      id: id,
      name: name,
      cattype:cattype
    });
  };

  const deletecategory = (id) => {
    dispatch({
      type: "DELETE_CATEGORY",
      id: id,
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        adminCredentials: state.adminState.adminData,
        locations: state.locationsState.locations,
        stylists: state.stylistsState.stylists,
        categories: state.categoriesState.categories,
        pendingBookings: state.pendingBookingsState.pending_bookings,
        upcomingBookings: state.upcomingBookingsState.upcoming_bookings,
        addLocation,
        addStylist,
        updateStylist,
        deleteStylist,
        addCategory,
        addSubcategory,
        updatecategory,
        deletecategory,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalContext);
};
