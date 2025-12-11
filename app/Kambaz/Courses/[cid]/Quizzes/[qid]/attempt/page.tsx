"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../client";
import {
  Button,
  Card,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

import { setQuiz } from "../../reducer";
import { setQuestion } from "../../questionReducer";
import { setAttempts, addAttempt } from "../../attemptsReducer";

export default function QuizAttempt() {
  const searchParams = useSearchParams();
  const { cid, qid } = useParams();

  const router = useRouter();
  const dispatch = useDispatch();

  // figure out what state user is in: attempt or review?
  const mode = searchParams.get("mode");
  const reqAttemptId = searchParams.get("attemptId") || null;
  //console.log("mode: ", mode);

  const inAttempt = mode === "attempt";
  const inReview = mode === "review";
  //console.log("inAttempt:", inAttempt);
  //console.log("inReivew:", inReview);

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { questions } = useSelector(
    (state: RootState) => state.questionReducer
  );

  const currentQuiz = quizzes.find((q: any) => q._id === qid);

  const [selectedAnswers, setSelectedAnswers] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [showCorrectAns, setShowCorrectAns] = useState<any>(false);

  // variables/states to handle the one at a time
  const [questionIndex, setQuestionIndex] = useState<any>(0);
  const oneAtTime = currentQuiz?.oneQuestionAtTime;

  // attempt variables to keep track of if they can take the quiz again
  const { attempts } = useSelector((state: RootState) => state.attemptsReducer);
  const attemptsUsed = attempts.length;
  const lastAttempt = attemptsUsed ? attempts[attemptsUsed - 1] : null;
  const curAttempt = reqAttemptId
    ? attempts.find((a: any) => a._id === reqAttemptId)
    : lastAttempt;

  //console.log("attempt: ", curAttempt);
  const handleSubmit = async () => {
    setSubmitting(true);
    // need to build my answers list to send to dao
    const answers = questions.map((q: any) => ({
      questionId: q._id,
      answerId: selectedAnswers[q._id] ?? null,
    }));
    //console.log("quiz id: ", qid);
    const newAttempt = await client.createAttempt(
      cid as string,
      qid as string,
      answers
    );
    dispatch(addAttempt(newAttempt));

    // send them back the quiz specific page (mirroring Canvas)
    router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleSelectedAnswer = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev: any) => {
      const current = prev[questionId];

      if (current === answerId) {
        const { [questionId]: _removed, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [questionId]: answerId,
      };
    });
  };
  //console.log("HERE:", currentQuiz?.showCorrectAnswer);
  //console.log("current quiz: ", currentQuiz);

  // helper determine if the correct answers should be shown
  // need to check the quiz requirements
  const showCorrectAnswers = () => {
    return !!currentQuiz?.showCorrectAnswer;
  };

  // helper to display users answers >> used for review mode
  const displayAnswers = (q: any, index: number) => {
    if (!q) return null;
    const showAnswers = showCorrectAnswers();
    //console.log("show answers", showAnswers);
    return (
      <div key={q._id} className="p-3">
        <Card>
          <div className="wd-title p-3 ps-2 bg-secondary">
            <b>Question {index + 1}</b>
            <div className="float-end">{q?.points} pts</div>
          </div>
          <Card className="wd-question rounded-0">
            <ListGroupItem className="wd-question p-3 ps-1">
              <i>{q?.question}</i> <br /> <hr />
              <Form>
                {q?.answers.map((a: any, i: number) => {
                  i++;
                  //console.log("type:", q.type);
                  if (
                    q?.type === "multiple-choice" ||
                    q?.type === "true/false"
                  ) {
                    return (
                      <div key={a._id} className="p-3">
                        <Row
                          className={
                            selectedAnswers[q._id] === a._id
                              ? "selected-answer p-2"
                              : ""
                          }
                        >
                          <Col sm={5}>{a.answer}</Col>

                          <Col>
                            {showAnswers && (
                              <>
                                {selectedAnswers[q._id] === a._id &&
                                  a.correct === true && (
                                    <FaCheckCircle className="text-success" />
                                  )}

                                {selectedAnswers[q._id] === a._id &&
                                  a.correct !== true && (
                                    <FaCircleXmark className="text-danger" />
                                  )}

                                {selectedAnswers[q._id] !== a._id &&
                                  a.correct === true && (
                                    <FaCheckCircle className="text-success" />
                                  )}
                              </>
                            )}
                            {/* this wasn't working - 1st attempt
                            {(selectedAnswers[q._id] === a._id &&
                              (showAnswers && a.correct === true ? (
                                <FaCheckCircle className="text-success" />
                              ) : (
                                <FaCircleXmark className="text-danger" />
                              ))) ||
                              (selectedAnswers[q._id] !== a._id &&
                                a.correct === true && (
                                  <FaCheckCircle className="text-success" />
                                ))}
                              */}
                          </Col>
                          <Col className="float-end">
                            {selectedAnswers[q._id] === a._id && (
                              <FaArrowLeft />
                            )}
                          </Col>
                        </Row>
                      </div>
                    );
                  }

                  if (q.type === "fill-in-blank") {
                    return (
                      <div key={a._id} className="p-3">
                        <Row
                          className={
                            selectedAnswers[q._id] === a._id
                              ? "selected-answer p-2"
                              : ""
                          }
                        >
                          <Col>
                            <FormControl
                              type="text"
                              name={q._id}
                              disabled={true}
                              defaultValue={a.answer}
                            ></FormControl>
                          </Col>

                          <Col>
                            {showAnswers && (
                              <>
                                {a.correct === true && (
                                  <FaCheckCircle className="text-success" />
                                )}

                                {a.correct !== true && (
                                  <FaCircleXmark className="text-danger" />
                                )}
                              </>
                            )}
                          </Col>
                          {a.correct !== true && (
                            <FormControl
                              type="text"
                              name={q._id}
                              disabled={true}
                              checked={selectedAnswers[q?._id] === a._id}
                              defaultValue={a._id}
                            ></FormControl>
                          )}
                          </Row>
                      </div>
                    );
                  }
                })}
              </Form>
            </ListGroupItem>
          </Card>
        </Card>
      </div>
    );
  };

  // Helper to Display Questions >> Only for attempt
  const displayQuestion = (q: any, index: number) => {
    if (!q) return null; // to prevent a potenial runtime error
    return (
      <div key={q._id} className="p-3">
        <Card>
          <div className="wd-title p-3 ps-2 bg-secondary">
            <b>Question {index + 1}</b>
            <div className="float-end">{q?.points} pts</div>
          </div>
          <Card className="wd-question rounded-0">
            <ListGroupItem className="wd-question p-3 ps-1">
              <i>{q?.question}</i> <br /> <hr />
              <Form>
                {q?.answers.map((a: any, i: number) => {
                  i++;
                  //console.log("type:", q.type);
                  if (
                    q?.type === "multiple-choice" ||
                    q?.type === "true/false"
                  ) {
                    return (
                      <FormCheck
                        key={a._id}
                        type="radio"
                        name={q._id}
                        label={a.answer}
                        checked={selectedAnswers[q?._id] === a._id}
                        onChange={() => handleSelectedAnswer(q._id, a._id)}
                      ></FormCheck>
                    );
                  }

                  if (q.type === "fill-in-blank") {
                    return (
                      <Row key={a._id} className="align-items-center">
                        <Col sm={1}>
                          <FormLabel>{i}</FormLabel>
                        </Col>
                        <Col>
                          <FormControl
                            key={a._id}
                            type="text"
                            name={q._id}
                            checked={selectedAnswers[q?._id] || ""}
                            onChange={(e) => handleSelectedAnswer(q._id, e.target.value)}
                          ></FormControl>
                        </Col>
                      </Row>
                    );
                  }
                })}
              </Form>
            </ListGroupItem>
          </Card>
        </Card>
      </div>
    );
  };

  useEffect(() => {
    const load = async () => {
      setQuestionIndex(0); // reset question index for every new attempt
      const quizData = await client.findQuizzesForCourse(cid as string);
      const questionData = await client.findQuestions(
        cid as string,
        qid as string
      );
      const attemptsData = await client.findAttemptsForQuizForStudent(
        cid as string,
        qid as string
      );

      dispatch(setQuiz(quizData));
      dispatch(setQuestion(questionData));
      dispatch(setAttempts(attemptsData || [])); // might not have taken yet
    };
    load();
  }, [cid, qid, dispatch]);

  useEffect(() => {
    if (!inReview || !curAttempt) return;
    // get the answers from attempt
    const answers: any = {};
    curAttempt.answers.forEach((a: any) => {
      answers[a.questionId] = a.answerId;
    });

    setSelectedAnswers(answers);
  }, [inReview, curAttempt]);

  //console.log("selected answeres: ", selectedAnswers);

  return (
    <div id="wd-css-paddings" className="wd-quiz-preview">
      <br />
      {/* Quiz details */}
      <div id="wd-quiz-preivew" style={{ border: "2px dotted gray" }}>
        <h4>
          <b>{currentQuiz?.name}</b>
        </h4>
        <br />
        <i>{currentQuiz?.instructions}</i>
        <hr />
        <br />

        {/* Attempt Mode -> taking the quiz */}
        {/* all questions */}
        {!oneAtTime && inAttempt && (
          <div>
            {questions.map((q: any, index: number) =>
              displayQuestion(q, index)
            )}

            {/* Buttons */}
            <Button variant="secondary" onClick={() => handleSubmit()}>
              Submit
            </Button>
          </div>
        )}

        {/* one @ a time */}
        {oneAtTime && inAttempt && (
          <div>
            {displayQuestion(questions[questionIndex], questionIndex)}

            {/* Buttons */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Button
                className="m-2"
                disabled={questionIndex === 0}
                onClick={() => setQuestionIndex((i: number) => i - 1)}
                variant="secondary"
              >
                Previous
              </Button>

              <Button
                className="m-2"
                disabled={questionIndex === questions.length - 1}
                onClick={() => setQuestionIndex((i: number) => i + 1)}
                variant="secondary"
              >
                Next
              </Button>
            </div>
            <hr />
            <Button
              className="float-end m-3"
              variant="secondary"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </div>
        )}

        {/* Review mode -> Look at your attempt */}
        {inReview && (
          <div>
            {questions.map((q: any, index: number) => displayAnswers(q, index))}
          </div>
        )}
      </div>
    </div>
  );
}
