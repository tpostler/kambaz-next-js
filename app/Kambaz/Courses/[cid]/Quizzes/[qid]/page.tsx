"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QuizDetailsEditButtons from "./QuizDetailsEditButtons";
import { Button, Card, Col, ListGroup, ListGroupItem, Row, Table } from "react-bootstrap";
import * as client from "../client";
import { v4 as uuidv4 } from "uuid";
import { setQuiz, addQuiz, deleteQuiz, updateQuiz } from "../reducer";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const newQuiz = qid === "new";
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const student = currentUser?.role === "STUDENT";
  const faculty = currentUser?.role === "FACULTY";

  //console.log("quizzes: ", quizzes);
  const currentQuiz = !newQuiz ? quizzes.find((q: any) => q._id === qid) : null;
  // consider adding error handeling
  //const currentQuiz = false;
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
      : currentQuiz
  );
  const [attempts, setAttempts] = useState<any[]>();

  // DEBUGGING
  // console.log("look here:", quiz?.name);
  // console.log("quizzes:", currentQuiz);

  useEffect(() => {
    if (newQuiz) return;
    const loadQuiz = async () => {
      if (currentQuiz) {
        setQuiz(currentQuiz);
        return;
      }
      if (!cid || !qid) return;

      const data = await client.findQuiz(cid as string, qid as string);
      setQuiz(data);
      dispatch(updateQuiz(data));
    };

    const loadAttempts = async () => {
      const data = await client.findAttemptsForQuizForStudent(
        cid as string,
        qid as string
      );
      setAttempts(data);
    };

    loadQuiz();
    loadAttempts();
  }, [cid, qid, currentQuiz, newQuiz, dispatch]);

  const attemptsUsed = attempts?.length;
  const maxAttempts = quiz
    ? quiz.allowMultipleAttempts
      ? quiz.numAttempts || 1
      : 1
    : 1;

  const attemptsLeft = maxAttempts - (attemptsUsed || 0);
  const quizStart = !!quiz && attemptsLeft > 0 && quiz.published;
  const lastAttempt = attempts?.length ? attempts[attempts.length - 1] : null;

  //console.log("current quiz: ", currentQuiz);
  //console.log("max attempts: ", maxAttempts);

  return (
    <div id="wd-css-paddings" className="wd-quiz-details">
      {/** faculty can preview and edit quiz from here */}
      {faculty && (
        <div>
          <QuizDetailsEditButtons />
          <br />
          <div id="wd-quiz-details" style={{ border: "2px dotted gray" }}>
            <h4>
              <b>{quiz?.name} - Details</b>
            </h4>
            <br />
            <div className="d-flex">
              <div className="wd-quiz-details">
                <Row>
                  <Col className="wd-quiz-details-right">
                    <b>Quiz Type</b>
                  </Col>
                  <Col className="wd-quiz-details-left">{quiz?.type}</Col>
                </Row>

                <Row>
                  <Col className="wd-quiz-details-right">
                    <b>Points</b>
                  </Col>
                  <Col className="wd-quiz-details-left">{quiz?.points}</Col>
                </Row>

                <Row>
                  <Col className="wd-quiz-details-right">
                    <b>Assignment Group</b>
                  </Col>
                  <Col className="wd-quiz-details-left">{quiz?.group}</Col>
                </Row>

                <Row>
                  <Col className="wd-quiz-details-right">
                    <b>Time Limit</b>
                  </Col>
                  <Col className="wd-quiz-details-left">
                    {quiz?.timeLimitSet
                      ? `${quiz?.timeLimit} minutes`
                      : "Unlimited"}
                  </Col>
                </Row>

                <Row>
                  <Col className="wd-quiz-details-right">
                    <b>Multiple Attempt</b>
                  </Col>
                  <Col className="wd-quiz-details-left">
                    {quiz?.allowMultipleAttempts ? "Yes" : "No"}
                  </Col>
                </Row>

                <Row>
                  <Col className="wd-quiz-details-right">
                    <b>View Responses</b>
                  </Col>
                  <Col className="wd-quiz-details-left">Always</Col>
                </Row>

                <Row>
                  <Col className="wd-quiz-details-right">
                    <b>Show Correct Answers</b>
                  </Col>
                  <Col className="wd-quiz-details-left">
                    {quiz?.showCorrectAnswer ? "Yes" : "No"}
                  </Col>
                </Row>

                <Row>
                  <Col className="wd-quiz-details-right">
                    <b>One Question at a Time</b>
                  </Col>
                  <Col className="wd-quiz-details-left">
                    {quiz?.oneQuestionAtTime ? "Yes" : "No"}
                  </Col>
                </Row>

                <Row>
                  <Col className="wd-quiz-details-right">
                    <b>Require Respondus LockDown Browswer</b>
                  </Col>
                  <Col className="wd-quiz-details-left">No</Col>
                </Row>

                <Row>
                  <Col className="wd-quiz-details-right">
                    <b>Required to View Quiz Results</b>
                  </Col>
                  <Col className="wd-quiz-details-left">No</Col>
                </Row>

                <Row>
                  <Col className="wd-quiz-details-right">
                    <b>Webcame Required</b>
                  </Col>
                  <Col className="wd-quiz-details-left">
                    {quiz?.requireWebCame ? "Yes" : "No"}
                  </Col>
                </Row>

                <Row>
                  <Col className="wd-quiz-details-right">
                    <b>Lock Questions After Answering</b>
                  </Col>
                  <Col className="wd-quiz-details-left">
                    {quiz?.lockQuestionAfterAnswer ? "Yes" : "No"}
                  </Col>
                </Row>

                <br />
                <br />
                <Row>
                  <Col>
                    <b>Due</b>
                  </Col>
                  <Col>
                    <b>For</b>
                  </Col>
                  <Col>
                    <b>Available from</b>
                  </Col>
                  <Col>
                    <b>Until</b>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    {quiz?.dueDate &&
                      new Date(quiz.dueDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </Col>
                  <Col>Everyone</Col>
                  <Col>
                    {quiz?.availableFromDate &&
                      new Date(quiz.availableFromDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                  </Col>
                  <Col>
                    {quiz?.availableToDate &&
                      new Date(quiz.availableToDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                  </Col>
                </Row>
                <hr />
              </div>
            </div>
          </div>

          <div>
            <Button
              variant="secondary"
              onClick={() => router.push(`/Kambaz/Courses/${cid}/Quizzes`)}
            >
              Save Quiz
            </Button>
          </div>
        </div>
      )}
      {student && (
        <div id="wd-quiz-details" className="">
          <br />
          <h4 className="d-flex justify-content-center me-2">
            <b>{quiz?.name}</b>
          </h4>
          <hr />
          {/** QUIZ DETAILS */}
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
            new Date(quiz.availableFromDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
          -{" "}
          {quiz?.availableToDate &&
            new Date(quiz.availableToDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
          |<b> Time Limit</b> {quiz?.timeLimit} | <b>Max Attempts</b> {maxAttempts}
          <hr />
          <br />
          <h4>
            <b>Instructions</b>
          </h4>
          <h5>{quiz?.instructions}</h5>
          {/* Attempts summary */}
          <b>Attempts left: </b> {attemptsLeft}
              <br/>
              <b>Total attempts: </b>{attemptsUsed}<br/>
              <b>Last attempt submitted at:</b> {" "}
              {lastAttempt?.dateSubmitted && (
                <>
                  {"("}
                  {new Date(lastAttempt.dateSubmitted).toLocaleString()}
                  {")"}
                </>
              )}
          <hr/>
          <br />
          {/* Past attempts */}
          <ListGroup>
          {(attempts !== undefined && attemptsUsed || 0) > 0 && (
            attempts?.map((a: any) => (
              <ListGroupItem className="list-group-item p-3 background-gray" key={a._id}>
                <Link
                className="text-dark"
                href={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/attempt?mode=reivew&attemptId=${lastAttempt._id}`}
                >
                  <h5><b>Attempt {a.attemptNumber}</b></h5>
                </Link>
                
                <b><i>Submitted at: </i></b> {a?.dateSubmitted &&
            new Date(a.dateSubmitted).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}<br/>
            <b><i>Score:</i></b> {a.score} / {quiz?.points}
              </ListGroupItem>
            )
          ))}
          </ListGroup>
          
          {/**
            <div className="mb-3">
              <br />
              <b>Score: </b>{lastAttempt?.score} / {quiz?.points} points
              <br/>
            </div>
             */}
          {/** i should be able to remove this */}
          {attemptsUsed === 0 && (
            <div className="mb-3">
              <b>Attempts used:</b> 0 / {maxAttempts}
            </div>
          )}
          <div className="d-flex justify-content-center">
            <div className="wd-quiz-details">
              <br />
              {attemptsLeft !== 0 && (
                <Button
                  variant="danger"
                  onClick={() =>
                    router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/attempt`)
                  }
                >
                  Take the Quiz
                </Button>
              )}
            </div>
          </div>
          <hr />
        </div>
      )}
    </div>
  );
}
