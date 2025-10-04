import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import "../../../styles.css";
export default function AssignmentHeaderButtons() {
  return (
    <div id="wd-modules-controls" className="d-flex align-items-center gap-2">
      <span className="border border-dark rounded-pill px-2 py-1">
        40% of Total
      </span>
      <BsPlus className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
