/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../Database";

import AssignmentControlsButtons from "./AssignmentControlsButtons";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentEditButtons from "./AssignmentEditButtons";
import AssignmentHeaderButtons from "./AssignmentHeaderButtons";
import { IoDocumentTextOutline } from "react-icons/io5";
import "../../../styles.css";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
  return (
    <div id="wd-assignments">
      <AssignmentControlsButtons />
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <BsGripVertical className="me-2 fs-3" /> <b>ASSIGNMENTS</b>
            <AssignmentHeaderButtons />
          </div>
          <ListGroup
            className="wd-asignments rounded-0"
            id="wd-assignment-list-item" >
            {assignments
            .filter((assignment: any) => assignment.course === cid)
            .map((assignment: any) =>
              <ListGroupItem
              key={assignment._id}
              className="wd-assignment p-3 ps-1 d-flex align-items-center"
              id="wd-assignment-list-item">
              <BsGripVertical className="me-2 fs-3" />
              <IoDocumentTextOutline className="me-2 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link
                  href={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                  className="wd-assignment-link text-dark"
                >
                  <b>{assignment.title}</b>
                </Link>
                <br />
                <span id="wd-assignment-list-text">
                  <span className="text-danger">Multiple Modules</span>
                  <span className="text-muted">
                    {" "}
                    | <b>Not avaible until </b>
                    May 6 at 12:00am | <br></br> <b>Due</b> May 13 at 11:59pm |
                    100pts
                  </span>
                </span>
              </div>
              <AssignmentEditButtons />
            </ListGroupItem>)}
            </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
