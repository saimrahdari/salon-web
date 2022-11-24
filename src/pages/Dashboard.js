import { useGlobalState } from "../contexts/globalState";
import Table from "../components/Table";
import "../styles/dashboard.css";

const Dashboard = (props) => {
  const { pendingBookings, upcomingBookings } = useGlobalState();

  return (
    <div className="dashboard">
      {/* <TableHeader title="Pending Approvals" /> */}
      <Table data={pendingBookings} title = "Pending Approvals"/>
      <span
        style={{
          color: "white",
          textAlign: "right",
          width: "90%",
          marginTop: "-50px",
          marginBottom: "50px",
          fontSize: "14px",
          fontWeigth: "400",
          textDecoration: "underline",
        }}
      >
        View more
      </span>
      {/* <TableHeader title="Upcoming Bookings" /> */}
      <Table data={upcomingBookings} title="Upcoming Bookings"/>
      <span
        style={{
          color: "white",
          textAlign: "right",
          width: "90%",
          marginTop: "-50px",
          marginBottom: "50px",
          fontSize: "14px",
          fontWeigth: "400",
          textDecoration: "underline",
        }}
      >
        View more
      </span>
    </div>
  );
};

export default Dashboard;
