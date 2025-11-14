"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import * as client from "../client";

import {
  Button,
  Card,
  CardTitle,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AssignmentEditor() {
  const router = useRouter();

  const { cid, aid } = useParams();
  const isNew = aid === "new";

  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentReducer
  ) as { assignments: any[] };

  const existingAssignment = assignments.find((a: any) => a._id === aid);

  // creating the intial state to work with
  const [assignment, setAssignment] = useState<any>({
    _id: isNew ? "new" : aid,
    title: isNew ? "New Assignment" : existingAssignment?.title ?? "",
    course: cid,
  });

  let asgnTitle = "";
  // do the logic of wether its a new assignment now:
  if (isNew) {
    asgnTitle = "New Assignment";
    // set everything defeault values
  } else {
    // need to fetch from the current assignment
    asgnTitle = assignments.find((a: any) => a._id === aid)?.title ?? "";
  }

  // saving
  const handleSave = async () => {
    if(aid === "new") {
     const neww = await client.createAssignmentForCourse(cid as string, assignment);

      dispatch(addAssignment(neww));
    }
    else {
      const saved = await client.updateAssignment(assignment);

      dispatch(updateAssignment(saved));
    }
    // return back to assignments page
    router.push(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <h4>Assignment Editor</h4>

      <Form 
      id="wd-assignment-form"
      onSubmit={(e) =>{
        e.preventDefault();
        console.log("did it try to submit?");
      }}>
        <Row>
          <FormLabel column sm={4}>
            Assignment Name
          </FormLabel>
          <Col sm={10}>
            <FormControl 
            type="text" 
            value={assignment.title}
            onChange={(e) => setAssignment({...assignment, title: e.target.value})} />
          </Col>
        </Row>
        <Row>
          <FormLabel column sm={4}>
            Description
          </FormLabel>

          <Col sm={10}>
            <FormControl
              as="textarea"
              style={{ height: "150px" }}
              placeholder="The assignment is availbe online Submit a link to the landing page of
          your Web application running on Netlify. The landing page should
          include the following: Your full name and section Links to each of the
          lab assignments. Link to the Kambaz application Links to all relevant
          source code repositiories. The Kambaz application should include a
          link to navigate back to the landing page."
            ></FormControl>
          </Col>
        </Row>
        <br />
        <Row>
          <FormLabel column sm={2} className="text-sm-end">
            Points
          </FormLabel>
          <Col sm={3}>
            <FormControl type="number" placeholder="100" />
          </Col>
        </Row>
        <br />
        <Row>
          <FormLabel column sm={2} className="text-sm-end">
            Assignment Group
          </FormLabel>
          <Col sm={3}>
            <FormSelect>
              <option value="assignments" defaultChecked>
                ASSIGNMENTS
              </option>
              <option value="quizzes">QUIZZES</option>
              <option value="exams">EXAMS</option>
              <option value="projects">PROJECTS</option>
            </FormSelect>
          </Col>
        </Row>{" "}
        <br />
        <Row>
          <FormLabel column sm={2} className="text-sm-end">
            Display Grade as
          </FormLabel>
          <Col sm={3}>
            <FormSelect>
              <option value="percentage" defaultChecked>
                Percentage
              </option>
              <option value="points">Points</option>
              <option value="hide">Hide</option>
            </FormSelect>
          </Col>
        </Row>
        <br />
        <Row>
          <FormLabel column sm={2} className="text-sm-end">
            Submission Type
          </FormLabel>
          <Col sm={6}>
            <Card className="p-3">
              <FormSelect>
                <option value="online" defaultChecked>
                  Online
                </option>
                <option value="on-paper">On Paper</option>
              </FormSelect>
              <br />
              <FormLabel column sm={10}>
                <b>Online Entry Options</b>
              </FormLabel>
              <br />
              <Col sm={10}>
                <FormCheck type="checkbox" label="Text Entry" /> <br />
                <FormCheck type="checkbox" label="Website URL" /> <br />
                <FormCheck type="checkbox" label="Media Recordings" /> <br />
                <FormCheck type="checkbox" label="Student Annotation" />
                <br />
                <FormCheck type="checkbox" label="File Uploads" /> <br />
              </Col>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <FormLabel column sm={2} className="text-sm-end">
            Assign
          </FormLabel>
          <Col sm={6}>
            <Card className="p-3">
              <CardTitle>
                <b>Assign to </b>
              </CardTitle>
              <FormControl type="tag" placeholder="Everyone" />
              <FormLabel column sm={5}>
                <b>Due</b>
              </FormLabel>
              <Col sm={5}>
                <FormControl type="date" defaultValue="2025-09-19" />
              </Col>
              <br />
              <Row>
                <Col sm={4}>
                  <FormLabel column sm={12}>
                    <b>Available from</b>
                  </FormLabel>
                  <Col sm={12}>
                    <FormControl type="date" defaultValue="2025-09-01" />
                  </Col>
                </Col>

                <Col sm={8}>
                  <FormLabel column sm={2}>
                    <b>Until</b>
                  </FormLabel>
                  <Col sm={6}>
                    <FormControl type="date" defaultValue="2025-09-01" />
                  </Col>
                </Col>
              </Row>
            </Card>
          </Col>
          <br />
        </Row>
        <Row>
          <Col sm={8}>
            <hr></hr>
            <div className="d-flex gap-2 align-right justify-content-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => 
                  router.push(`/Kambaz/Courses/${cid}/Assignments`)
                }
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
