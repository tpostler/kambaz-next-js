export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h4>
        <label htmlFor="wd-name">Assignment Name</label>{" "}
      </h4>
      <form id="wd-assignment-form">
        <input id="wd-name" defaultValue="A1 - ENV + HTML" />
        <br />
        <br />
        <textarea
          id="wd-description"
          rows={10}
          cols={40}
          defaultValue="The assignment is availbe online Submit a link to the landing page of
          your Web application running on Netlify. The landing page should
          include the following: Your full name and section Links to each of the
          lab assignments. Link to the Kambaz application Links to all relevant
          source code repositiories. The Kambaz application should include a
          link to navigate back to the landing page."
        ></textarea>
        <br />
        <table>
          <thead></thead>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>

          {/* MY CODE BELOW */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option selected value="ASSIGNMENTS">
                  ASSIGNMENTS
                </option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECTS">PROJECTS</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as </label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option selected value="Percentage">
                  Percentage
                </option>
                <option value="Points">Points</option>
                <option value="Hide">Hide</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option selected value="Online">
                  Online
                </option>
                <option value="On Paper">On Paper</option>
              </select>
            </td>
          </tr>
          <tr>
            <td></td>
            <td align="left" valign="top">
              <label id="wd-online-entry">Online Entry Options</label>
              <br />

              <input
                type="checkbox"
                name="check-online-entry"
                id="wd-text-entry"
              />
              <label htmlFor="wd-text-entry">Text Entry</label>
              <br />

              <input
                type="checkbox"
                name="check-online-entry"
                id="wd-website-url"
              />
              <label htmlFor="wd-website-url">Website URL</label>
              <br />

              <input
                type="checkbox"
                name="check-online-entry"
                id="wd-media-recordings"
              />
              <label htmlFor="wd-media-recordings">Media Recordings</label>
              <br />

              <input
                type="checkbox"
                name="check-online-entry"
                id="wd-student-annotation"
              />
              <label htmlFor="wd-student-annotation">Student Annotation</label>
              <br />

              <input
                type="checkbox"
                name="check-online-entry"
                id="wd-file-uploads"
              />
              <label htmlFor="wd-file-uploads">File Uploads</label>
              <br />
            </td>
          </tr>
          <tr>
            <td></td>
            <td align="left" valign="top">
              <label id="wd-assign-to">Assign to</label>
              <br />
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td align="left" valign="top">
              <label id="wd-due-date">Due</label>
              <br />
              <input type="date" id="wd-due-date" defaultValue="2025-09-19" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td align="left" valign="top">
              <label id="wd-avaible-from">Available from</label>
              <br />
              <input
                type="date"
                id="wd-avaible-from"
                defaultValue="2025-09-01"
              />
              <br />
            </td>
            <td align="left" valign="top">
              <label id="wd-avaible-until">Until</label>
              <br />
              <input
                type="date"
                id="wd-avaible-until"
                defaultValue="2025-09-01"
              />
              <br />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <hr></hr>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td align="right" valign="top">
              <button id="wd-cancel">Cancel</button>{" "}
              <button id="wd-save">Save</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}
