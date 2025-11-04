"use client";
import { useState } from "react";
import Link from "next/link";

import * as db from "../Database";

import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";

import { enrollStudent, unenrollStudent } from "./reducer";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";

export default function Dashboard() {
  //const router = useRouter();
  const dispatch = useDispatch();

  // view mode - default not enabled
  const [enMode, setEnMode] = useState(false);

  //let coursesEnrolled;
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentReducer
  );
  // I might be able to get rid of this
  //const [enrollment, setEnrollment] = useState("");

  // current user
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  // this should be fine, but may need to update based on how I implement the enrollment mode
  const { courses } = useSelector((state: any) => state.coursesReducer);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/CS1234.jpg",
    description: "New Description",
  });
  // DEBUG
  //console.log("Current user: ", currentUser);
  //console.log("Courses: ", course);
  //console.log("enrollments: ", enrollments);

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <div className="mb-2">
        <Button
          className="button btn-primary float-end"
          onClick={() => {
            setEnMode(!enMode);
            // debug
            console.log("enable mode: ", enMode);
          }}
        >
          Enrollements
        </Button>
      </div>
      <br />
      <br />
      {currentUser?.role === "FACULTY" && (
        <div>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>

          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            as="textarea"
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </div>
      )}
      <hr />
      <h2 id="wd-dashboard-published">Published Courses</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter((course: any) => {
              if (!currentUser) return false;
              if (enMode) {
                return enrollments;
              } else {
                return enrollments.some(
                  (enrollment: any) =>
                    enrollment.user === currentUser._id &&
                    enrollment.course === course._id
                );
              }
            })
            .map((course: any) => {
              const isEnrolled = enrollments.some(
                (enrollment: any) =>
                  enrollment.user === currentUser?._id &&
                  enrollment.course === course._id
              );
              return (
                <Col
                  key={course._id}
                  className="wd-dashboard-course"
                  style={{ width: "300px" }}
                >
                  <Card>
                    <CardImg
                      src={course.image}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <CardBody className="card-body">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}{" "}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}{" "}
                      </CardText>
                      {!enMode && (
                        <div>
                          <Link href={`/Kambaz/Courses/${course._id}/Modules`}>
                            <button className="btn btn-primary">Go</button>
                          </Link>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(deleteCourse(course._id));
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                      {enMode &&
                        (isEnrolled ? (
                          <button
                            className="btn btn-danger me-2"
                            onClick={() =>
                              //course, userID
                              dispatch(
                                unenrollStudent({
                                  course: course._id,
                                  userID: currentUser?._id,
                                })
                              )
                            }
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            className="btn btn-success me-2"
                            onClick={() =>
                              dispatch(
                                enrollStudent({
                                  course: course._id,
                                  userID: currentUser?._id,
                                })
                              )
                            }
                          >
                            Enroll
                          </button>
                        ))}
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
}
