import Table from "../components/Table";
import TableHeader from "../components/TableHeader";
import Footer from "../components/Footer";
import "../styles/upcomingBookings.css";
import { useGlobalState } from "../contexts/globalState";

const UpcomingBookings = (props) => {
  const { upcomingBookings } = useGlobalState();

  return (
    <div className="upcoming-bookings">
      <Table title="Upcoming Bookings" data={upcomingBookings} />
      <Footer />
    </div>
  );
};

export default UpcomingBookings;
