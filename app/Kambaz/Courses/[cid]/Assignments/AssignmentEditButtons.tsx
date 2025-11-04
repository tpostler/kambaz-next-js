import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmarkAssign from "./GreenCheckmarkAssign";
import { FaTrash } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

export default function AssignmentEditButtons({ userRole, assignmentId, deleteAssignment, }: {
  userRole: string;
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void; 
  }) { 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => {
      deleteAssignment(assignmentId);
      setShow(false);
  }
  return (
    <div className="float-end">
      <GreenCheckmarkAssign />

      {/* update so only faculaty can see */}
      {userRole === "FACULTY" && 
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={ handleShow} />
      }

      <Modal show={show}>
            <Modal.Header>
              <Modal.Title>Delete Assignment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to remove this assignment?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary"
              onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="primary btn-danger"
                onClick={handleDelete}>
                Yes
              </Button>
            </Modal.Footer>
        </Modal>

      <IoEllipsisVertical className="fs-1" />
    </div>
  );
}
