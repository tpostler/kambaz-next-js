import { IoEllipsisVertical } from "react-icons/io5";
import PublishControlQuiz from "./PublishControlQuiz";
import { FaTrash } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import React from "react";

import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { deleteQuiz as deleteQuizAction } from "./reducer";

// LEGACY REMOVE THIS 

export default function QuizEditButtons({
  userRole,
  quizId,
}: {
  userRole: string;
  quizId: string;
}) {
  // for the quiz context menu
  const [show2, setShow2] = useState(false);
  //const handleShow2 = () => setShow2(true); // I might be re-use, for now keep it here

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await client.deleteQuiz(cid as string, quizId);
    setShow(false);
  };

  const handlePublish = async () => {
    //await client.publishQuiz(cid as string, quizId as string);
  };

  return (
    <div className="float-end">
      {/*<PublishControlQuiz />*/}

      {/* update so only faculaty can see */}
      {userRole === "FACULTY" && (
        <>
          <FaTrash className="text-danger me-2 mb-1" onClick={handleShow} />
          <IoEllipsisVertical
            className="fs-1"
            onClick={() => setShow2((show) => !show)}
          />
        </>
      )}

      {/* Delete Modal */}
      <Modal className="wd-delete-module" show={show}>
        <Modal.Header>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this quiz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary btn-danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Now need to add context menu 
          maybe I should remove the greencheck mark....*/}
      {show2 && (
        <div className="wd-contextMenu" style={{ padding: "20px" }}>
          <div
            className="wd-contextMenu-item context-hover"
            onClick={() => console.log("Edit")}
          >
            Edit
          </div>
          <div
            className="wd-contextMenu-item context-hover"
            onClick={handleShow}
          >
            Delete
          </div>
          {/* Add a conditional so if quiz is published then the button needs to unpublish... */}
          <div
            className="wd-contextMenu-item context-hover"
            onClick={() => console.log("Publish quiz")}
          >
            Publish
          </div>
        </div>
      )}
    </div>
  );
}
