import { useState } from "react";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ArrayStateVariable() {
  const { todos } = useSelector((state: any) => state.todosReducer);
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };
  return (
    <div id="wd-array-state-variables">
      <ListGroup>
        <ListGroupItem>
          <h3>Array State Variable</h3>
          <button onClick={addElement} className="btn btn-success">
            Add Element
          </button>
          {array.map((item, index) => (
            <ListGroupItem key={index}>
              <Row>
                <Col>{index}</Col>
                <Col>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteElement(index)}
                  >
                    Delete
                  </button>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
          <ListGroup>
            {todos.map((todo: any) => (
              <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
            ))}
          </ListGroup>
          <hr />
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}