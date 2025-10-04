import Link from "next/link";
import AssignmentControlsButtons from "./AssignmentControlsButtons";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentEditButtons from "./AssignmentEditButtons";
import AssignmentHeaderButtons from "./AssignmentHeaderButtons";
import { IoDocumentTextOutline } from "react-icons/io5";
import "../../../styles.css";

export default function Assignments() {
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

          <ListGroup className="wd-asignments rounded-0">
            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <IoDocumentTextOutline className="me-2 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link
                  href="/Kambaz/Courses/1234/Assignments/123"
                  className="wd-assignment-link text-dark"
                >
                  <b>A1 - ENV + HTML</b>
                </Link>
                <br />
                <span id="wd-assignment-list-text">
                   <span className="text-danger">Multiple Modules</span><span className="text-muted"> | <b>Not avaible until </b>
                  May 6 at 12:00am | <br></br> <b>Due</b> May 13 at 11:59pm |
                  100pts</span>
                </span>
              </div>
              <AssignmentEditButtons />
            </ListGroupItem>

            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <IoDocumentTextOutline className="me-2 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link
                  href="/Kambaz/Courses/1234/Assignments/123"
                  className="wd-assignment-link text-dark"
                >
                  <b>A2 - CSS + BOOTSTRAP</b>
                </Link>
                <br />
                <span id="wd-assignment-list-text">
                  <span className="text-danger">Multiple Modules</span> <span className="text-muted">| <b>Not avaible until </b>
                  May 13 at 12:00am | <br></br> <b>Due</b> May 20 at 11:59pm |
                  100pts</span>
                </span>
              </div>
              <AssignmentEditButtons />
            </ListGroupItem>

            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <IoDocumentTextOutline className="me-2 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link
                  href="/Kambaz/Courses/1234/Assignments/123"
                  className="wd-assignment-link text-dark"
                >
                  <b>A3 - JAVASCRIPT + REACT</b>
                </Link>
                <br />
                <span id="wd-assignment-list-text">
                   <span className="text-danger">Multiple Modules</span><span className="text-muted"> | <b>Not avaible until </b>
                  May 20 at 12:00am | <br></br> <b>Due</b> May 27 at 11:59pm |
                  100pts</span>
                </span>
              </div>
              <AssignmentEditButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
      {/* 
      <h3 id="wd-assignments-title">QUIZZES 10% of Total <button>+</button></h3>
      <ul id="wd-assignment-list">
        <ListGroupItem className="wd-assignment-list-item">
          Q1 - TBD
          <br></br>
          <text id="wd-assignment-list-text">
            Quizzes will be released on a week by week basis
          </text>
        </ListGroupItem>
      </ul>

      <h3 id="wd-assignments-title">EXAMS 20% of Total <button>+</button></h3>
      <ul id="wd-assignment-list">
        <ListGroupItem className="wd-assignment-list-item">
          E1 - MIDTERM 1
          <br></br>
          <text id="wd-assignment-list-text">
            Covers Modules 1-3 | <b>Due</b> June 10 at 11:59pm | 100pts
          </text>
        </ListGroupItem>
        <ListGroupItem className="wd-assignment-list-item">
          E2 - MIDTERM 2
          <br></br>
          <text id="wd-assignment-list-text">
            Covers Modules 4-6 | <b>Due</b> July 2 at 11:59pm | 100pts
          </text>
        </ListGroupItem>
      </ul>

      <h3 id="wd-assignments-title">PROJECTS - 30% of Total <button>+</button></h3>
      <ul id="wd-assignment-list">
        <ListGroupItem className="wd-assignment-list-item">
          P1 - PROJECT 1
          <br></br>
          <text id="wd-assignment-list-text">
            TBD... | <b>Due</b> June 5 at 11:59pm | 100pts
          </text>
        </ListGroupItem>
        <ListGroupItem className="wd-assignment-list-item">
          P2 - PROJECT 2
          <br></br>
          <text id="wd-assignment-list-text">
            TBD.. | <b>Due</b> June 30 at 11:59pm | 100pts
          </text>
        </ListGroupItem>
        <ListGroupItem className="wd-assignment-list-item">
          P3 - FINAL PROJECT
          <br></br>
          <text id="wd-assignment-list-text">
            TBD... | <b>Due</b> July 25 at 11:59pm | 100pts
          </text>
        </ListGroupItem>
      </ul>
      */}
    </div>
  );
}
