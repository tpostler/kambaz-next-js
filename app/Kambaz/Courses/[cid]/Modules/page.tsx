export default function Modules() {
  return (
    <div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      <div className="wd-home-buttons">
        <button type="button" id="wd-collapse-all">Collaspse All</button>
        <button type="button" id="wd-view-progress">View Progress</button>
        <select id="wd-publish-options">
          <option selected value="PUBLISH ALL">Publish All</option>
          <option value="UNPUBLISH ALL">Unpublish All</option>
        </select>
        <button type="button" id="wd-add-module">+ Module</button>
      </div>
      
      {/* add the buttons above ^^ */}
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
        {/* MY CODE BELOW */}
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introduction</li>
                <li className="wd-content-itme">Full Stack Developer - Chapter 2 - Creating User</li>
              </ul>
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content"> 
                <li className="wd-content-item">Introduction to Web Developement</li>
                <li className="wd-content-item">Creating an HTTP server with Node.s</li>
                <li className="wd-content0item">Creating a React Application</li>
              </ul>
            </li>
          </ul>
        </li>
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
      </ul>
    </div>
);}
