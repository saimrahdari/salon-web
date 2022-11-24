import { IoStarSharp } from "react-icons/io5";
import ProfilePicture from "../components/ProfilePicture";
import "../styles/bookingDetails.css";

const BookingDetails = (props) => {
  return (
    <div className="booking-details">
      <h2>Booking Details</h2>
      <div className="details">
        <div className="cell">
          Name <span>David</span>
        </div>
        <div className="cell">
          Phone <span>123456</span>
        </div>
        <div className="cell">
          Date <span>Aug, 10th 2022</span>
        </div>
        <div className="cell">
          Start Time <span>12:00 PM</span>
        </div>
        <div className="cell">
          Email <span>David@gmail.com</span>
        </div>
        <div className="cell" id="stylist">
          Stylist
          <div className="card">
            <ProfilePicture
              style={{ width: "35px", height: "35px", marginRight: "20px" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "16px",
              }}
            >
              Alia
              <div>
                <IoStarSharp className="icon" />
                <IoStarSharp className="icon" />
                <IoStarSharp className="icon" />
                <IoStarSharp className="icon" />
                <IoStarSharp className="icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="cell">
          Duration <span>1 hour</span>
        </div>
        <div className="cell">
          Location <span>Street abc, Area name, city</span>
        </div>
      </div>
      <div className="services">
        Services
        <div>
          <div className="service-item">
            <span>Manicure</span>
            <span style={{ fontWeight: "700" }}>$50</span>
          </div>
          <div className="service-item">
            <span>Hair cut</span>
            <span style={{ fontWeight: "700" }}>$50</span>
          </div>
        </div>
      </div>
      <div className="total">
        Total Payment
        <div className="item">
          <span>Total</span>
          <span style={{ fontWeight: "700" }}>$100</span>
        </div>
      </div>
      <button>Reject</button>
      <button className="approve">Approve</button>
    </div>
  );
};

export default BookingDetails;
