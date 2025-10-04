import { Button, FormControl, FormLabel, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaPlus } from "react-icons/fa6";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
export default function AssignmentControlsButtons() {
  return (
    <div
      id="wd-assignment-header-controls"
      className="d-flex justify-content-between align-items-center"
    >
      <InputGroup style={{ width: "300px" }}>
        <InputGroupText>
          <HiMiniMagnifyingGlass className="fs-4" />
        </InputGroupText>
        <FormControl placeholder="Search..." />
      </InputGroup>

      <div id="wd-assignment-control-btns">
        <Button
          variant="danger"
          size="lg"
          className="me-1 float-end"
          id="wd-add-module-btn"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="me-1 float-end"
          id="wd-add-module-btn"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Group
        </Button>
      </div>
    </div>
  );
}
