"use client";

import {
  Button,
  Card,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

import * as client from "../../client";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addQuestion, updateQuestion } from "../../questionReducer";

export default function QuestionEdit({
  questionToEdit,
  Saved,
  Cancel,
}: {
  questionToEdit?: any;
  Saved?: () => void;
  Cancel?: () => void;
}) {

  const { cid, qid } = useParams();
  const dispatch = useDispatch();

  const [error, setError] = useState<any>();
  const [hoveredAnswerId, setHoveredAnswerId] = useState<string | null>(null);
  const [question, setQuestion] = useState<any>(() =>
    questionToEdit
      ? { ...questionToEdit }
      : {
          _id: uuidv4(),
          title: "",
          type: "multiple-choice",
          points: 4,
          question: "",
          answers: [
            {
              _id: uuidv4(),
              answer: "",
              correct: true,
            },
            {
              _id: uuidv4(),
              answer: "",
              correct: false,
            },
          ],
        }
  );

  const isEditing = questionToEdit !== undefined && questionToEdit !== null;

  const deleteAnswer = (answerId: string) => {
    setQuestion((prev: any) => ({
      ...prev,
      answers: prev.answers.filter((a: any) => a._id != answerId),
    }));
  };

  // this will already handle removing the other correct, becuase its a mapping function :)
  const updateAnswer = (answerId: string) => {
    //console.log("hitting");
    setQuestion((prev: any) => ({
      ...prev,
      answers: prev.answers.map((a: any) =>
        a._id === answerId ? { ...a, correct: true } : { ...a, correct: false }
      ),
    }));
  };

  const handleCancel = async () => {
    console.log("hitting cancel");
    if (Cancel) Cancel();
  };
  const checkForm = (): boolean => {
    setError(null);

    if (!question.title.trim()) {
      setError("Question title required");
      return false;
    }
    if (!question.question.trim()) {
      setError("Question required for question");
      return false;
    }
    if (question.type === "multiple-choice") {
      if (!question.answers || question.answers.length < 2) {
        setError(
          "At least 2 questions are required for multiple choice questions"
        );
        return false;
      }
    }
    if (question.type === "fill-in-blank") {
      if (!question.answers || question.answers.length < 1) {
        setError(
          "At least 1 question is required for a fill in blank question"
        );
        return false;
      }
    }

    if (question.answers.some((a: any) => !a.answer.trim())) {
      setError("Answers cannot be blank");
      return false;
    }

    if ((question.type === "multiple-choice" || question.type === "true/false" ) &&
      !question.answers.some((a: any) => a.correct)) {
      setError("Please select a correct answer");
      return false;
    }
    // if made it here then valid question and should be saved to backend
    return true;
  };

  const handleSave = async () => {
    if (!checkForm()) {
      return;
    }
    try {
    // DEBUG
    //console.log("check form: ", checkForm);
    //console.log("error: ", error);
    //console.log("title: ", question.title);
    //console.log("hitting save?");
    //console.log("editing: ", isEditing);
    //console.log("question: ", question);
    if(isEditing) {

      const updatedQuestion = await client.updateQuestion(
        cid as string,
        qid as string,
        question
      );
     
      dispatch(updateQuestion(updatedQuestion));
    } else {
    

    const newQuestion = await client.createQuestion(
      cid as string,
      qid as string,
      question
    );
    dispatch(addQuestion(newQuestion));
    }

    if (Saved) Saved();
  } catch (e) {
    console.log("failed to save");
    console.log(e);
  }
  };

  // called to reset the the questions
  const handleQuestionTypeChange = (newQuestionType: any) => {
    setQuestion((prev: any) => {
      let ans;

      if (newQuestionType === "multiple-choice") {
        ans = [
          { _id: uuidv4(), answer: "", correct: true },
          { _id: uuidv4(), answer: "", correct: false },
        ];
      }

      if (newQuestionType === "true/false") {
        ans = [
          { _id: uuidv4(), answer: "True", correct: true },
          { _id: uuidv4(), answer: "False", correct: false },
        ];
      }

      if (newQuestionType === "fill-in-blank") {
        ans = [{ _id: uuidv4(), answer: "", correct: true }];
      }

      return {
        ...prev,
        type: newQuestionType,
        answers: ans,
      };
    });
  };
  // helpers
  const multipleChoiceQuestion = () => {
    return (
      <div>
        {question.answers.map((answer: any, index: any) => (
          <Row key={answer._id} className="mb-2">
            {!answer.correct && (
              <FormLabel
                column
                sm={3}
                className="text-sm-end possible-answer"
                onMouseEnter={() => setHoveredAnswerId(answer._id)}
                onMouseLeave={() => setHoveredAnswerId(null)}
                onClick={() => updateAnswer(answer._id)}
              >
                {hoveredAnswerId === answer._id
                  ? "Correct Answer"
                  : "Possible Answer"}
              </FormLabel>
            )}
            {answer.correct && (
              <FormLabel column sm={3} className="text-sm-end correct-ans">
                <FaCheckCircle />
                Correct Answer
              </FormLabel>
            )}

            <Col sm={7}>
              <FormControl
                type="text"
                placeholder={`Answer ${index + 1}`}
                value={answer.answer}
                onChange={(e) => {
                  const value = e.target.value;
                  setQuestion((q: any) => ({
                    ...q,
                    answers: q.answers.map((a: any) =>
                      a._id === answer._id ? { ...a, answer: value } : a
                    ),
                  }));
                }}
              />
            </Col>
            <Col sm={2}>
              <FaTrash
                onClick={(e) => {
                  e.preventDefault();
                  deleteAnswer(answer._id);
                }}
              />
            </Col>
          </Row>
        ))}
      </div>
    );
  };

  const trueFalseQuestion = () => {
    return (
      <div>
        {question.answers.map((answer: any) => (
          <Row key={answer._id} className="mb-2">
            <Col sm={3} className="text-sm-end">
              <FormCheck
                type="radio"
                name="true/false"
                checked={answer.correct}
                onChange={() => updateAnswer(answer._id)}
              />
            </Col>
            <Col sm={3}>{answer.answer}</Col>
            {answer.correct && (
              <FormLabel column sm={4} className="text-sm-end correct-ans">
                <FaCheckCircle />
                Correct Answer
              </FormLabel>
            )}
          </Row>
        ))}
      </div>
    );
  };

  const fillInBlankQuestion = () => {
    return (
      <div>
        {question.answers.map((answer: any, index: any) => (
          <Row key={answer._id} className="mb-2">
            {!answer.correct && (
              <FormLabel
                column
                sm={3}
                className="text-sm-end possible-answer"
                onMouseEnter={() => setHoveredAnswerId(answer._id)}
                onMouseLeave={() => setHoveredAnswerId(null)}
                onClick={() => updateAnswer(answer._id)}
              >
                {hoveredAnswerId === answer._id
                  ? "Correct Answer"
                  : "Possible Answer"}
              </FormLabel>
            )}
            {answer.correct && (
              <FormLabel column sm={3} className="text-sm-end correct-ans">
                <FaCheckCircle />
                Correct Answer
              </FormLabel>
            )}

            <Col sm={7}>
              <FormControl
                type="text"
                placeholder={`Answer ${index + 1}`}
                value={answer.answer}
                onChange={(e) => {
                  const value = e.target.value;
                  setQuestion((q: any) => ({
                    ...q,
                    answers: q.answers.map((a: any) =>
                      a._id === answer._id ? { ...a, answer: value } : a
                    ),
                  }));
                }}
              />
            </Col>
            <Col sm={2}>
              <FaTrash
                onClick={(e) => {
                  e.preventDefault();
                  deleteAnswer(answer._id);
                }}
              />
            </Col>
          </Row>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if(questionToEdit) {
      setQuestion(questionToEdit);
    }
  }, [questionToEdit]);

  return (
    <div>
      <Card>
        {}
        <Form
          className="p-3"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/** HEADER */}
          <Row>
            <Col sm={3}>
              <FormControl
                type="text"
                placeholder={"Title"}
                value={question.title}
                onChange={(e) =>
                  setQuestion((q: any) => ({ ...q, title: e.target.value }))
                }
              />
            </Col>

            <Col sm={1}>
              <FormLabel column>
                <b>Type</b>
              </FormLabel>
            </Col>
            <Col sm={3}>
              <FormSelect
                value={question.type}
                onChange={(e) => handleQuestionTypeChange(e.target.value)}
              >
                <option value="multiple-choice" defaultChecked>
                  Multiple Choice
                </option>
                <option value="true/false">True/False</option>
                <option value="fill-in-blank">Fill in the Blank</option>
              </FormSelect>
            </Col>
            <Col sm={1}>
              <FormLabel column>
                <b>Pts</b>
              </FormLabel>
            </Col>
            <Col sm={2}>
              <FormControl type="number" defaultValue="4"></FormControl>
            </Col>
          </Row>
          {/** END HEADER */}
          <br />
          {/** QUESTION TEXTBOX */}
          <Row>
            <i>Enter your question in the box and add your answers below</i>
          </Row>
          <br />
          <Row>
            <FormLabel>
              <h5>
                <b>Question</b>
              </h5>
            </FormLabel>
            <FormControl
              as="textarea"
              style={{ height: "150px", margin: "10px" }}
              placeholder={`Enter your question here.\n\nex) What is the square root of 4,489?`}
              value={question.question}
              onChange={(e) =>
                setQuestion((q: any) => ({ ...q, question: e.target.value }))
              }
            ></FormControl>
          </Row>
          {/** END QUESTION */}
          <br />
          <Row>
            <h5>
              <b>Answers</b>
            </h5>
          </Row>

          {/* START OF THE ANSWERS */}
          {question.type === "multiple-choice" && multipleChoiceQuestion()}
          {question.type === "true/false" && trueFalseQuestion()}
          {question.type === "fill-in-blank" && fillInBlankQuestion()}
        </Form>

        {/** FORM BUTTONS */}
        <Row className="p-3">
          {(question.type === "multiple-choice" ||
            question.type === "fill-in-blank") && (
            <Col sm={5}>
              <Button
                className=""
                onClick={() => {
                  setQuestion((q: any) => ({
                    ...q,
                    answers: [
                      ...q.answers,
                      {
                        _id: uuidv4(),
                        answer: "",
                        correct: false,
                      },
                    ],
                  }));
                }}
              >
                Add Answer
              </Button>
            </Col>
          )}
        </Row>
        <hr />
        {error && (
          <Row className="mt-2">
            <Col>
              <div className="text-danger p-3">
                <h5>
                  <b>
                    <i>*{error}*</i>
                  </b>
                </h5>
              </div>
            </Col>
          </Row>
        )}

        <Row className="p-3">
          <Col>
            <Button variant="secondary" onClick={() => handleCancel()}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button variant="success" onClick={() => handleSave()}>
              Save Question
            </Button>
          </Col>
        </Row>
        {/** END FORM BUTTONS */}
      </Card>
    </div>
  );
}
