import "../styles/notifications.css";
import tick from "../assets/tick.png";

const arr = [
  {
    text: "Booking ahead get ready!",
    time: "12:00 PM",
  },
  {
    text: "Booking ahead get ready!",
    time: "12:00 PM",
  },
  {
    text: "Booking ahead get ready!",
    time: "12:00 PM",
  },
];

const Notifications = (props) => {
  return (
    <div className="notifications">
      <div id="notifications-header">
        <h2>Notifications</h2>
        <p className="center-container">
          <img
            src={tick}
            style={{ width: "18px", height: "18px", marginRight: "5px" }}
            alt=""
          ></img>
          Mark all read
        </p>
      </div>

      {arr.map((a) => {
        return (
          <div className="notification">
            <div className="circle"></div>
            <p>{a.text}</p>
            <div className="time">{a.time}</div>
          </div>
        );
      })}
      <p className="caption">All Catched Up</p>
    </div>
  );
};

export default Notifications;
