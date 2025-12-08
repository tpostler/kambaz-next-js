import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { TbXboxXFilled } from "react-icons/tb";


export default function PublishControlQuiz() {
  return (
    <span className="me-1 position-relative">
      <FaCheckCircle style={{ top: "0px" }} className="text-success me-1 position-absolute fs-2" />
      <FaCircle className="text-white me-1 fs-3" />
      {/* <TbXboxXFilled className="text-green"/> */}
    </span>);
}