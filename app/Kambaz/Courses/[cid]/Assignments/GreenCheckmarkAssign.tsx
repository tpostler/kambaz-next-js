import { FaCheckCircle, FaCircle } from "react-icons/fa";
export default function GreenCheckmarkAssign() {
  return (
    <span className="me-1 position-relative">
      <FaCheckCircle style={{ top: "0px" }} className="text-success me-1 position-absolute fs-2" />
      <FaCircle className="text-white me-1 fs-3" />
    </span>);}