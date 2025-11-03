"use client"

import { useState } from "react";

import { useParams } from "next/navigation";
import Link from "next/link";

import * as db from "../../../Database";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import "../../../styles.css";

import AssignmentControlsButtons from "./AssignmentControlsButtons";
import AssignmentEditButtons from "./AssignmentEditButtons";
import AssignmentHeaderButtons from "./AssignmentHeaderButtons";

// reducer (state management) stuff 
import { addAssignment, editAssignment, updateAssignment, deleteAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";

// TODO - refactor so that only faculty can only edit

export default function Assignments() {

  // set up state mangement for assignments
  const { cid } = useParams();
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const { assignments } = useSelector((state: RootState) => state.assignmentReducer);
  const dispatch = useDispatch();
  
  // set up state manager for users
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  // DEBUG
  console.log("current user:", currentUser?.firstName);
  //console.log("current user role:", currentUser?.role);
  //const assignments = db.assignments;

  return (
    <div id="wd-assignments">
      {/* If the role is faculty then show the controls */}
      {currentUser?.role == "FACULTY" ? <AssignmentControlsButtons/> : <br />}
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

          { /* showing the assignments */}
          <ListGroup
            className="wd-asignments rounded-0"
            id="wd-assignment-list-item" >
            {/* This is where my main edits wil be */}
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
                    | <b>Not avaible until </b>
                    May 6 at 12:00am | <br></br> <b>Due</b> May 13 at 11:59pm |
                    100pts
                  </span>
                </span>
              </div>
              <AssignmentEditButtons 
              assignmentId={assignment._id}
              deleteAssignment={(assignmentId) => {
                dispatch(deleteAssignment(assignmentId));
              }}/>
            </ListGroupItem>)}
            </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
