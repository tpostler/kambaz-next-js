import { useParams } from "next/navigation";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaPlus } from "react-icons/fa6";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { useRouter } from "next/navigation"; // this has been the bane of my existance

export default function QuizControlsButtons() {
  const router = useRouter();

  const { cid } = useParams();
  //const [assignmentTitle, setAssignmentTitle] = useState("");
  //const { assignments } = useSelector((state: RootState) => state.assignmentReducer);
  //const dispatch = useDispatch();
  //const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  // debug
  //console.log("current user: ", currentUser);

  return (
    <div
      id="wd-assignment-header-controls"
      className="d-flex justify-content-between align-items-center"
    >
        {/* Keep this */}
      <InputGroup id="wd-quiz-search-bar" style={{ width: "300px" }}>
        <InputGroupText>
          <HiMiniMagnifyingGlass className="fs-4" />
        </InputGroupText>
        <FormControl placeholder="Search..." />
      </InputGroup>

      <div id="wd-quiz-control-btns">
        <Button
          variant="danger"
          size="lg"
          className="me-1 float-end"
          id="wd-add-module-btn"
          onClick={() => {
            router.push(`/Kambaz/Courses/${cid}/Quizzes/new`);
            console.log("add a new quizz");
          }}>
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }} />
          Quiz
        </Button>
      </div>
    </div>
  );
}
