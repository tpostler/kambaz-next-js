"use client"

import { useParams, useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function QuizDetailsEditButtons() {
    
  const router = useRouter();

  const { cid, qid } = useParams();
  return (
    <div
      id="wd-assignment-header-controls"
      className="d-flex align-items-center"
    >
      <Button 
      className="wd-quiz-details-btn me-2"
      variant="secondary"
      onClick={() => router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`)}
      >
        Preview
      </Button>
      <br />
      <Button
        className="wd-quiz-details-btn"
        variant="secondary"
        // note that the new will have to change to be dynamic
        onClick={() => router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)}
      >
        <FaPencil />
        {"  "}
        Edit
      </Button>
    </div>
  );
}
