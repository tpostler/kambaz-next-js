"use client";

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
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContainer,
  TabContent,
  TabPane,
} from "react-bootstrap";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import QuestionEdit from "./QuestionEdit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { v4 as uuidv4 } from "uuid";
import * as client from "../../client";
import { setQuiz, addQuiz, deleteQuiz, updateQuiz } from "../../reducer";
import {
  setQuestion,
} from "../../questionReducer";
import Link from "next/link";
import { BsGripVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { IoEllipsisVertical } from "react-icons/io5";

export default function EditQuiz() {
  const router = useRouter();

  // state managment
  const { cid, qid } = useParams();
  const newQuiz = qid === "new";
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { questions } = useSelector(
    (state: RootState) => state.questionReducer
  );
  //console.log("Questions: ", questions);
  const oldQuiz = quizzes.find((q: any) => q._id === qid);
  //const oldQuiz = false;

  const [quiz, setQuiz] = useState<any>(
    newQuiz
      ? {
          _id: uuidv4(),
          course: cid,
          name: "New Quiz",
          instructions: "",
          type: "Graded Quiz",
          points: 20,
          group: "Quizzes",
          timeLimitSet: true,
          timeLimit: 20,
          allowMultipleAttempts: false,
          numAttempts: 1,
          shuffleAnswers: true,
          requireWebCam: false,
          oneQuestionAtTime: true,
          requireAccessCode: false,
          accessCode: true,
          lockQuestionAfterAnswer: false,
          showCorrectAnswer: true,
          timeToShowCAnswer: 1,
        }
      : oldQuiz ?? ""
  );
  // state handleing to question editing, need to maintain these
  // b/c question editing is happening directly here and not in seperate component
  // almost same as module edit

  const [editingQuestion, setEditingQuestion] = useState<any>(false);
  const [showQuestionEditor, setShowQuestionEditor] = useState<any>(false);
  const [menuState, setmenuState] = useState(false);
  const [activeMenu, setActiveMenu] = useState<any>(); // to keep track of which menu opens

  const handleMenuToggle = async (questionId: string) => {
    if (menuState && activeMenu === questionId) {
      setmenuState(false);
      setActiveMenu(null);
    } else {
      setmenuState(true);
      setActiveMenu(questionId);
    }
  };

  const handleDelete = async (questionId: string) => {
    console.log("question id:", questionId);
    await client.deleteQuestion(
      cid as string,
      qid as string,
      questionId as string
    );

    //setShow(false);
    setmenuState(false);
    //dispatch(deleteQuestion(questionId)); // this is the reducer but I'm not sure what to put here

    // force to reload
    const data = await client.findQuestions(cid as string, qid as string);
    //setQuestion(data);
    dispatch(setQuestion(data)); // maybe this is the problem line
  };

  const handleSaveQuiz = async () => {
    if (!cid) return;
    if (!quiz) return;

    /* DEBUG
    console.log("Saving Quiz: ", {
      cid,
      qid,
      newQuiz,
      quizId: quiz._id,
      quiz,
    });
    */

    try {
      if (newQuiz) {
        const newQuizState = await client.createQuiz(cid as string, quiz);
        dispatch(addQuiz(newQuizState));
        router.push(`/Kambaz/Courses/${cid}/Quizzes/${newQuizState._id}`);
      } else {
        //const updatedQuizState = await client.updateQuiz(cid as string, quiz);
        await client.updateQuiz(cid as string, quiz);
        dispatch(updateQuiz(quiz));
        router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = async () => {
    if (!cid) return;
    if (!quiz) return;
    try {
      if (newQuiz) {
        router.push(`/Kambaz/Courses/${cid}/Quizzes`);
      } else {
        router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const [activeTab, setActiveTab] = useState<string>("Details");
  const [showNewQuestion, setShowNewQuestion] = useState(false);

  const handleNewQuestion = () => {
    setEditingQuestion(null); // no question to edit cause this is a new question
    setShowQuestionEditor(true);
  };

  // had to look up how to do this
  const handleTabSelect = (eventKey: string | null) => {
    if (!eventKey) {
      return;
    }
    setActiveTab(eventKey);
  };

  useEffect(() => {
    if (newQuiz) return;
    const loadQuiz = async () => {
      if (oldQuiz) {
        setQuiz(oldQuiz);
        return;
      }
      if (!cid || !qid) return;

      const data = await client.findQuiz(cid as string, qid as string);
      setQuiz(data);
      dispatch(updateQuiz(data));
    };

    const loadQuestions = async () => {
      const data = await client.findQuestions(cid as string, qid as string);
      //setQuestion(data);
      dispatch(setQuestion(data));
    };

    loadQuiz();
    loadQuestions();
  }, [cid, qid, oldQuiz, newQuiz, dispatch]);
  return (
    <div className="wd-quiz-edit-quiz">
      <h3>
        <b>{quiz.name}</b>
      </h3>
      {quiz.published? <p>Published</p> : <p>Not Published</p>}
      <TabContainer activeKey={activeTab} onSelect={handleTabSelect}>
        <Nav variant="tabs">
          <NavItem>
            <NavLink eventKey="Details">Details</NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey="Questions">Questions</NavLink>
          </NavItem>
        </Nav>
        <TabContent>
          <TabPane eventKey="Details">
            {/** Think about putting this into a another tsx and importing in...  */}
            <br />
            <Form
              id="wd-assignment-form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Row>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={quiz?.name ?? ""}
                    onChange={(e) =>
                      setQuiz((prev: any) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </Col>
              </Row>
              <Row>
                <FormLabel column sm={4}>
                  Quiz Instructions
                </FormLabel>
                <Col sm={10}>
                  <FormControl
                    as="textarea"
                    style={{ height: "150px" }}
                    value={quiz?.instructions ?? ""}
                    onChange={(e) =>
                      setQuiz((prev: any) => ({
                        ...prev,
                        instructions: e.target.value,
                      }))
                    }
                  ></FormControl>
                </Col>
              </Row>
              <br />
              <Row>
                <FormLabel column sm={2} className="text-sm-end">
                  Quiz Type
                </FormLabel>
                <Col sm={3}>
                  <FormSelect
                    value={quiz?.type ?? "graded-quiz"}
                    onChange={(e) =>
                      setQuiz((prev: any) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                  >
                    <option value="graded-quiz">Graded Quiz</option>
                    <option value="practice-quiz">Practice Quiz</option>
                    <option value="graded-survey">Graded Survey</option>
                    <option value="ungraded-survey">Ungraded survey</option>
                  </FormSelect>
                </Col>
              </Row>
              <br />
              <Row>
                <FormLabel column sm={2} className="text-sm-end">
                  Assignment Group
                </FormLabel>
                <Col sm={3}>
                  <FormSelect
                    value={quiz?.group ?? "quizzes"}
                    onChange={(e) =>
                      setQuiz((prev: any) => ({
                        ...prev,
                        group: e.target.value,
                      }))
                    }
                  >
                    <option value="quizzes">Quizzes</option>
                    <option value="exams">Exams</option>
                    <option value="assignments">Assignments</option>
                    <option value="projects">Projects</option>
                  </FormSelect>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={2} className="text-sm-end">
                  <FormLabel>
                    <b>Options</b>
                  </FormLabel>
                </Col>
                <Col sm={6}>
                  <Card className="p-3">
                    <b>Setup</b>
                    <hr />
                    <FormCheck
                      type="checkbox"
                      label="Time Limit"
                      onChange={(e) =>
                        setQuiz((prev: any) => ({
                          ...prev,
                          timeLimitSet: e.target.checked,
                        }))
                      }
                    />
                    <FormControl
                      type="number"
                      defaultValue="20"
                      onChange={(e) =>
                        setQuiz((prev: any) => ({
                          ...prev,
                          timeLimit: Number(e.target.value),
                        }))
                      }
                    />
                    <br />
                    <FormCheck
                      type="checkbox"
                      label="Allow Multiple Attemps"
                      checked={!!quiz?.allowMultipleAttempts}
                      onChange={(e) =>
                        setQuiz((prev: any) => ({
                          ...prev,
                          allowMultipleAttempts: e.target.checked,
                        }))
                      }
                    ></FormCheck>
                    <br />
                    <FormCheck
                      type="checkbox"
                      label="Shuffle Answers"
                      checked={!!quiz?.shuffleAnswers}
                      onChange={(e) =>
                        setQuiz((prev: any) => ({
                          ...prev,
                          shuffleAnswers: e.target.checked,
                        }))
                      }
                    />
                    <br />
                    <FormCheck
                      type="checkbox"
                      label="Require Access Code"
                      checked={!!quiz?.requireAccessCode}
                      onChange={(e) =>
                        setQuiz((prev: any) => ({
                          ...prev,
                          requireAccessCode: e.target.checked,
                        }))
                      }
                    ></FormCheck>
                    <FormControl
                      type="text"
                      defaultValue={quiz?.accessCode}
                      onChange={(e) =>
                        setQuiz((prev: any) => ({
                          ...prev,
                          accessCode: e.target.value,
                        }))
                      }
                    />
                    <br />
                    <FormCheck
                      type="checkbox"
                      label="Require Webcam"
                      checked={!!quiz?.requireWebCam}
                      onChange={(e) =>
                        setQuiz((prev: any) => ({
                          ...prev,
                          requireWebCam: e.target.checked,
                        }))
                      }
                    ></FormCheck>
                    <br />
                    <b>Questions</b> <hr />
                    <FormCheck
                      type="checkbox"
                      checked={!!quiz?.oneQuestionAtTime}
                      label="One Question at a Time"
                      onChange={(e) =>
                        setQuiz((prev: any) => ({
                          ...prev,
                          oneQuestionAtTime: e.target.checked,
                        }))
                      }
                    ></FormCheck>
                    <br />
                    <FormCheck
                      type="checkbox"
                      label="Lock Question After Answer"
                      checked={!!quiz?.lockQuestionAfterAnswer}
                      onChange={(e) =>
                        setQuiz((prev: any) => ({
                          ...prev,
                          lockQuestionAfterAnswer: e.target.checked,
                        }))
                      }
                    ></FormCheck>
                    <br />
                    <Card>
                      <div style={{ margin: "20px" }}>
                        <FormCheck
                          type="checkbox"
                          label="Show Correct Answers"
                          checked={!!quiz?.showCorrectAnswer}
                          onChange={(e) =>
                            setQuiz((prev: any) => ({
                              ...prev,
                              showCorrectAnswer: e.target.checked,
                            }))
                          }
                        ></FormCheck>
                        After
                        <br />
                        {quiz.showCorrectAnswer && (
                          <div>
                            <FormControl
                              className="wd-minutes"
                              type="number"
                              defaultValue={quiz?.timeToShowCAnswer}
                              onChange={(e) =>
                                setQuiz((prev: any) => ({
                                  ...prev,
                                  timeToShowCAnswer: e.target.value,
                                }))
                              }
                            ></FormControl>
                            minutes
                          </div>
                        )}
                      </div>
                    </Card>
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
                      <FormControl
                        value={
                          quiz?.dueDate ?
                          new Date(quiz.dueDate).toLocaleDateString("en-CA") : ""
                        }
                        onChange={(e) =>
                          setQuiz((prev: any) => ({
                            ...prev,
                            dueDate: e.target.value,
                          }))
                        }
                        type="date"
                      />
                    </Col>
                    <br />
                    <Row>
                      <Col sm={4}>
                        <FormLabel column sm={12}>
                          <b>Available from</b>
                        </FormLabel>
                        <Col sm={12}>
                          <FormControl 
                          value={
                          quiz?.availableFromDate ?
                          new Date(quiz.availableFromDate).toLocaleDateString("en-CA") : ""
                        }
                        onChange={(e) =>
                          setQuiz((prev: any) => ({
                            ...prev,
                            availableFromDate: e.target.value,
                          }))
                        }
                          type="date" />
                        </Col>
                      </Col>

                      <Col sm={8}>
                        <FormLabel column sm={2}>
                          <b>Until</b>
                        </FormLabel>
                        <Col sm={6}>
                          <FormControl type="date" 
                          value={
                          quiz?.availableToDate ?
                          new Date(quiz.availableToDate).toLocaleDateString("en-CA") : ""
                        }
                        onChange={(e) =>
                          setQuiz((prev: any) => ({
                            ...prev,
                            availableToDate: e.target.value,
                          }))
                        }
                          />
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
                    onClick={() => handleCancel()}>
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleSaveQuiz()}
                    >
                      Save
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </TabPane>
          <TabPane eventKey="Questions">
            <div className="wd-add-question p-3">
              <ListGroup
                className="wd-asignments rounded-0"
                id="wd-assignment-list-item"
              >
                <br />
                <Button
                  variant="danger"
                  className="wd-add-question-btn"
                  onClick={() => handleNewQuestion()}
                >
                  <FaPlus></FaPlus> New Question
                </Button>
                <div>
                  <br />
                  {showQuestionEditor && (
                    <QuestionEdit
                      questionToEdit={editingQuestion}
                      Saved={() => {
                        setShowQuestionEditor(false);
                        setEditingQuestion(null);
                      }}
                      Cancel={() => {
                        setShowQuestionEditor(false);
                        setEditingQuestion(null);
                      }}
                    />
                  )}
                </div>

                <br />
                {questions.map((question: any) => (
                  <ListGroupItem
                    key={question._id}
                    className="wd-question p-0 mb-5 fs-5 border-gray"
                  >
                    <div className="wd-title p-3 ps-2 bg-secondary">
                      <b>Question</b>

                      <IoEllipsisVertical
                        className="fs-1 float-end"
                        onClick={() => handleMenuToggle(question._id)}
                      />
                      <div className="float-end">{question.points} pts</div>
                    </div>
                    {menuState && activeMenu === question._id && (
                      <div
                        className="wd-contextMenu"
                        style={{ padding: "20px" }}
                      >
                        <div
                          className="wd-contextMenu-item context-hover"
                          onClick={() => {
                            setEditingQuestion(question);
                            setShowQuestionEditor(true);
                          }}
                        >
                          Edit
                        </div>
                        <div
                          className="wd-contextMenu-item context-hover"
                          onClick={() => handleDelete(question._id)}
                        >
                          Delete
                        </div>
                      </div>
                    )}

                    <ListGroup className="wd-question rounded-0">
                      <ListGroupItem className="wd-question p-3 ps-1">
                        <i>{question.question} </i>
                        {question.answers.map((answer: any) => (
                          <div key={answer._id}>
                            <ul>
                              {answer.correct ? (
                                <div>
                                  <li>
                                    {answer.answer}
                                    <FaCheckCircle className="float-end green" />
                                  </li>
                                </div>
                              ) : (
                                <li>{answer.answer}</li>
                              )}
                            </ul>
                          </div>
                        ))}
                      </ListGroupItem>
                    </ListGroup>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </TabPane>
        </TabContent>
      </TabContainer>
    </div>
  );
}
