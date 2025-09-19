import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
          <br></br>
          <text id="wd-assignment-list-text">
            Multiple Modules | <b>Not avaible until </b>
            May 6 at 12:00am | <br></br> <b>Due</b> May 13 at 11:59pm | 100pts
          </text>
        </li>

        <li className="wd-assignment-list-item">
          {/* MY CODE BELOW */}
          <Link href="/Courses/1234/Assignments/123"
          className="wd-assignments-link">
            A2 - CSS + BOOTSTRAP
          </Link>
          <br></br>
          <text id="wd-assignment-list-text">
            Multiple Modules | <b>Not avaible until </b>
            May 13 at 12:00am | <br></br> <b>Due</b> May 20 at 11:59pm | 100pts
          </text>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123"
          className="wd-assignments-link">
            A3 - JAVASCRIPT + REACT
          </Link>
          <br></br>
          <text id="wd-assignment-list-text">
            Multiple Modules | <b>Not avaible until </b>
            May 20 at 12:00am | <br></br> <b>Due</b> May 27 at 11:59pm | 100pts
          </text>
        </li>
      </ul>
      {/* More of my code */}
      <h3 id="wd-assignments-title">QUIZZES 10% of Total <button>+</button></h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          Q1 - TBD
          <br></br>
          <text id="wd-assignment-list-text">
            Quizzes will be released on a week by week basis
          </text>
        </li>
      </ul>

      <h3 id="wd-assignments-title">EXAMS 20% of Total <button>+</button></h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          E1 - MIDTERM 1
          <br></br>
          <text id="wd-assignment-list-text">
            Covers Modules 1-3 | <b>Due</b> June 10 at 11:59pm | 100pts
          </text>
        </li>
        <li className="wd-assignment-list-item">
          E2 - MIDTERM 2
          <br></br>
          <text id="wd-assignment-list-text">
            Covers Modules 4-6 | <b>Due</b> July 2 at 11:59pm | 100pts
          </text>
        </li>
      </ul>

      <h3 id="wd-assignments-title">PROJECTS - 30% of Total <button>+</button></h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          P1 - PROJECT 1
          <br></br>
          <text id="wd-assignment-list-text">
            TBD... | <b>Due</b> June 5 at 11:59pm | 100pts
          </text>
        </li>
        <li className="wd-assignment-list-item">
          P2 - PROJECT 2
          <br></br>
          <text id="wd-assignment-list-text">
            TBD.. | <b>Due</b> June 30 at 11:59pm | 100pts
          </text>
        </li>
        <li className="wd-assignment-list-item">
          P3 - FINAL PROJECT
          <br></br>
          <text id="wd-assignment-list-text">
            TBD... | <b>Due</b> July 25 at 11:59pm | 100pts
          </text>
        </li>
      </ul>
    </div>
  );
}
