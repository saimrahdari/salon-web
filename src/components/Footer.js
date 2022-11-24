import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "../styles/footer.css";

const Footer = (props) => {
  return (
    <div className="footer">
      <div style={props.contentStyle} >
        Page 1 of 2 <IoIosArrowBack className="icon inactive" /> 1
        <IoIosArrowForward className="icon active" />
      </div>
    </div>
  );
};

export default Footer;
