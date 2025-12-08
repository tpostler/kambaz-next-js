"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { RxRocket } from "react-icons/rx";
import "../../../styles.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import * as client from "./client";
import { setQuiz } from "./reducer";
import { useEffect, useState } from "react";
import QuizControlsButtons from "./QuizControlButtons";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";

export default function Quizzes() {
  // set up state mangement for assignments
  const { cid } = useParams();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const student = currentUser?.role === "STUDENT";
  const faculty = currentUser?.role === "FACULTY";

  const publishedQuizzes = student
    ? quizzes.filter((q: any) => q.published)
    : quizzes;

  // to handle the opening of the menu
  const [menuState, setmenuState] = useState(false);
  const [activeMenu, setActiveMenu] = useState<any>(); // to keep track of which menu opens

  const handleMenuToggle = async (quizId: string) => {
    if (menuState && activeMenu === quizId) {
      setmenuState(false);
      setActiveMenu(null); // this could be wrong
    } else {
      setmenuState(true);
      setActiveMenu(quizId);
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async (quizId: string) => {
    await client.deleteQuiz(cid as string, quizId);

    setShow(false);
    setmenuState(false);

    // force to reload
    const data = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuiz(data));
  };

  const handlePublish = async (quizId: string, quiz: any) => {
    const update = { published: !quiz.published };
    await client.publishQuiz(cid as string, quizId as string, update);
    setmenuState(false);
    console.log("quiz: ", quiz);

    // force to load
    const data = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuiz(data));
  };


  useEffect(() => {
    const load = async () => {
      const data = await client.findQuizzesForCourse(cid as string);
      dispatch(setQuiz(data));
    };
    load();
  }, [cid, dispatch]);

  return (
    <div id="wd-quiz">
      {/* control buttons - only faculty */}
      {faculty && <QuizControlsButtons />}
      <br /> <br /> <br />
      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <b>Assignment Quizzes</b>
          </div>

          {/* showing the assignments */}
          <ListGroup
            className="wd-asignments rounded-0"
            id="wd-assignment-list-item"
          >
            {student &&
              quizzes.map((quiz: any) => (
                <ListGroupItem
                  key={quiz._id}
                  className="wd-assignment p-3 ps-1 d-flex align-items-center"
                  id="wd-assignment-list-item"
                >
                  <RxRocket className="me-2 fs-3 text-success" />
                  <div className="flex-grow-1">
                    <Link
                      href={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                      className="wd-assignment-link text-dark"
                    >
                      <b>{quiz.name}</b>
                    </Link>
                    <br />
                    <span id="wd-assignment-list-text">
                     
                      <div className="text-muted">
                      <b>Due</b>{" "}
                      {quiz?.dueDate &&
                        new Date(quiz.dueDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                      | <b>Points</b> {quiz?.points} | <b>Questions</b>{" "}
                      {quiz?.questions?.length || 0} | <b>Available </b>
                      {quiz?.availableFromDate &&
                        new Date(quiz.availableFromDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}{" "}
                      -{" "}
                      {quiz?.availableToDate &&
                        new Date(quiz.availableToDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}{" "}
                        
                      |<b> Time Limit</b> {quiz?.timeLimit} minutes
                      </div>
                    </span>
                  </div>
                </ListGroupItem>
              ))}

            {faculty &&
              quizzes.map((quiz: any) => (
                <ListGroupItem
                  key={quiz._id}
                  className="wd-assignment p-3 ps-1 d-flex align-items-center"
                  id="wd-assignment-list-item"
                >
                  <RxRocket className="me-2 fs-3 text-success" />
                  <div className="flex-grow-1">
                    <Link
                      href={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                      className="wd-assignment-link text-dark"
                    >
                      <b>{quiz.name}</b>
                    </Link>
                    <br />
                    <span id="wd-assignment-list-text">
                      {/* This needs to be changed... */}
                      <span className="text-muted">{quiz.points} pts |</span>
                    </span>
                  </div>

                  {/* publish status icons - can only see if faculty*/}
                  {faculty && (
                    <div className="p-3 ps-1 d-flex align-items-center">
                      {quiz.published ? (
                        <div className="p-2">
                          <FaCheckCircle
                            style={{ top: "0px" }}
                            className="text-success me-1  fs-2"
                          />
                        </div>
                      ) : (
                        <div className="p-2">
                          <FaCircleXmark
                            style={{ top: "0px" }}
                            className="text-danger me-1 fs-2"
                          />
                        </div>
                      )}

                      <div className="float-end">
                        {/* update so only faculaty can see */}
                        {faculty && (
                          <IoEllipsisVertical
                            className="fs-1"
                            onClick={() => handleMenuToggle(quiz._id)}
                          />
                        )}

                        {/* Delete Modal */}
                        <Modal className="wd-delete-module" show={show}>
                          <Modal.Header>
                            <Modal.Title>Delete Quiz</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Are you sure you want to delete this quiz?
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Cancel
                            </Button>
                            <Button
                              variant="primary btn-danger"
                              onClick={() => handleDelete(quiz._id)}
                            >
                              Yes
                            </Button>
                          </Modal.Footer>
                        </Modal>

                        {menuState && activeMenu === quiz._id && (
                          <div
                            className="wd-contextMenu"
                            style={{ padding: "20px" }}
                          >
                            <div
                              className="wd-contextMenu-item context-hover"
                              onClick={() =>
                                router.push(
                                  `/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`
                                )
                              }
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
                              onClick={() => handlePublish(quiz._id, quiz)}
                            >
                              Publish
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
