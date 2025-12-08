"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../client";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { setQuiz } from "../../reducer";
import { setQuestion } from "../../questionReducer";
import { BsGripVertical } from "react-icons/bs";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { questions } = useSelector(
    (state: RootState) => state.questionReducer
  );
  const currentQuiz = quizzes.find((q: any) => q._id === qid);
  const [selectedAnswers, setSelectedAnswers] = useState<any>({});

  // variables/states to handle the one at a time
  const [questionIndex, setQuestionIndex] = useState<any>(0);
  const oneAtTime = currentQuiz?.oneQuestionAtTime;
  const currentQuestion = oneAtTime ? questions[questionIndex] : null;

  console.log("one at a time", oneAtTime);
  // DEBUG
  //console.log("quiz: ", currentQuiz?.name);

  const handleSubmit = () => {
    router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleEdit = () => {
    router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`);
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

  // helper to display the question:
  const displayQuestion = (q: any, index: number) => (
    <div key={q?._id} className="p-3">
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
                if (q?.type === "multiple-choice" || q?.type === "true/false") {
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
                          checked={selectedAnswers[q?._id] === a._id}
                          onChange={() => handleSelectedAnswer(q._id, a._id)}
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

  useEffect(() => {
    setQuestionIndex(0); // reset question index for every new attempt
    // i might need to add something else
    const load = async () => {
      const quizData = await client.findQuizzesForCourse(cid as string);
      const questionData = await client.findQuestions(
        cid as string,
        qid as string
      );

      dispatch(setQuiz(quizData));
      dispatch(setQuestion(questionData));
    };
    load();
  }, [cid, qid, dispatch]);

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
        {/* Questions */}

        {/* all questions */}
        {!oneAtTime && (
          <>
            {questions.map((q: any, index: number) =>
              displayQuestion(q, index)
            )}

            {/* Buttons */}
            <Button variant="danger" onClick={() => handleEdit()}>
              Edit Quiz
            </Button>
            {"   "}
            <Button variant="secondary" onClick={() => handleSubmit()}>
              Submit
            </Button>
          </>
        )}

        {/* one @ a time */}
        {oneAtTime && (
          <>
            {displayQuestion(questions[questionIndex], questionIndex)}

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
            <hr/>
            {/* Buttons */}
            <Button className="m-3" variant="secondary" onClick={() => handleEdit()}>
              Edit Quiz
            </Button>
            {"   "}
            <Button className="float-end m-3"
            variant="secondary" onClick={() => handleSubmit()}>
              Submit
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
