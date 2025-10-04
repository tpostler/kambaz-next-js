import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";

export default function Modules() {
  return (
    <div>
      {/* This needs to change */}
      <div className="wd-home-buttons">
        <button type="button" id="wd-collapse-all">
          Collaspse All
        </button>
        <button type="button" id="wd-view-progress">
          View Progress
        </button>
        <select id="wd-publish-options">
          <option selected value="PUBLISH ALL">
            Publish All
          </option>
          <option value="UNPUBLISH ALL">Unpublish All</option>
        </select>
        <button type="button" id="wd-add-module">
          + Module
        </button>
      </div>

      {/* add the buttons above ^^ */}
      <ModulesControls />
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1">
              LEARNING OBJECTIVES{" "}
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              Introduction to the course{" "}
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              Learn what is Web Development{" "}
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary"> Week 2 </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1">
              LESSON 1{" "}
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              LESSON 2{" "}
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
      {/*
        <li className="wd-module">
          <div className="wd-title"> Week 1, Lecture 2 - Formatting User Interfaces with HTML</div>
          <ul class-name="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                  <li className="wd-content-item">Deploy the assignment to Netlify</li>
                </ul>
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to HTML and the DOM</li>
                  <li className="wd-content-item">Formatting Web content with Headings</li>
                  <li className="wd-content-item">Formatting content with Lists and Tables</li>
                </ul>
              </li>
            </ul>
        </li>

        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul class-name="wd-lessons">
            <li className="wd-lesson">TBD...</li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul class-name="wd-lessons">
            <li className="wd-lesson"> TBD...</li>
          </ul>
        </li>
*/}
    </div>
  );
}
