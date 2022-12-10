import { useGlobalState } from "../contexts/globalState";
import Table from "../components/Table";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
const Dashboard = (props) => {
  const { pendingBookings, upcomingBookings } = useGlobalState();
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      {/* <TableHeader title="Pending Approvals" /> */}
      <Table data={pendingBookings} title = "Pending Approvals"/>
      <span
      
        style={{
          color: "white",
          textAlign: "right",
          width: "90%",
          marginTop: "-30px",
          marginBottom: "50px",
          fontSize: "14px",
          fontWeigth: "400",
          textDecoration: "underline",
        }}
      >
       <a style={{
          color: "white",}} href="/pending-bookings">  View more</a>
      </span>
      {/* <TableHeader title="Upcoming Bookings" /> */}
      <Table data={upcomingBookings} title="Upcoming Bookings"/>
      <span
     
       
        style={{
          color: "white",
          textAlign: "right",
          width: "90%",
          marginTop: "-30px",
          marginBottom: "50px",
          fontSize: "14px",
          fontWeigth: "400",
          textDecoration: "underline",
        }}
      >
      <a style={{
          color: "white",}} href="/upcoming-bookings">
        View more</a>
      </span>
    </div>
  );
};

export default Dashboard;
