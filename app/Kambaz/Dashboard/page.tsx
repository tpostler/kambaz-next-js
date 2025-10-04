import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      <div id="wd-dashboard-courses">
        {/* Code Here */}
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Kambaz/Courses/1234"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/reactjs.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1234 React JS
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Full Stack software developer
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            {" "}
            ... Another course ...{" "}
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            {" "}
            ... Another course ...{" "}
          </Col>
        </Row>
      </div>
      {/* My added courses */}
      {/* COURSE 2 */}
      <div className="wd-dashboard-course">
        <Link href="/Kambaz/Courses/1001" className="wd-dashboard-course-link">
          <img src="/images/marketing.jpg" width={200} height={150} />
          <div>
            <h5> MKT1001 Intro Marketing </h5>
            <p className="wd-dashboard-course-title">Learn Marketing</p>
            <button> Go </button>
          </div>
        </Link>
      </div>
      {/* COURSE 3 */}
      <div className="wd-dashboard-course">
        <Link href="/Kambaz/Courses/1002" className="wd-dashboard-course-link">
          <img src="/images/analytics.jpg" width={200} height={150} />
          <div>
            <h5> MISM1002 Intro to Analytics </h5>
            <p className="wd-dashboard-course-title">Learn Analytics</p>
            <button> Go </button>
          </div>
        </Link>
      </div>
      {/* COURSE 4 */}
      <div className="wd-dashboard-course">
        <Link href="/Kambaz/Courses/2550" className="wd-dashboard-course-link">
          <img src="/images/computer.jpg" width={200} height={150} />
          <div>
            <h5> CS2550 Object Oriented Design </h5>
            <p className="wd-dashboard-course-title">Objects! In code?!?</p>
            <button> Go </button>
          </div>
        </Link>
      </div>
      {/* COURSE 5 */}
      <div className="wd-dashboard-course">
        <Link href="/Kambaz/Courses/5000" className="wd-dashboard-course-link">
          <img src="/images/yapping.jpeg" width={200} height={150} />
          <div>
            <h5> PPL5000 Small Talk & Yapping </h5>
            <p className="wd-dashboard-course-title">
              Lock in on your yapping and small talk
            </p>
            <button> Go </button>
          </div>
        </Link>
      </div>
      {/* COURSE 6 */}
      <div className="wd-dashboard-course">
        <Link href="/Kambaz/Courses/4505" className="wd-dashboard-course-link">
          <img src="/images/math.jpeg" width={200} height={150} />
          <div>
            <h5> MATH4505 Intro. Adv. Math </h5>
            <p className="wd-dashboard-course-title">
              Super hard math class. No for the weak.
            </p>
            <button> Go </button>
          </div>
        </Link>
      </div>
      {/* COURSE 7 */}
      <div className="wd-dashboard-course">
        <Link href="/Kambaz/Courses/3456" className="wd-dashboard-course-link">
          <img src="/images/figma.jpg" width={200} height={150} />
          <div>
            <h5> DSG3456 Intro. Figma </h5>
            <p className="wd-dashboard-course-title">Learn Figma!</p>
            <button> Go </button>
          </div>
        </Link>
      </div>
      {/* COURSE 8 */}
      <div className="wd-dashboard-course">
        <Link href="/Kambaz/Courses/6767" className="wd-dashboard-course-link">
          <img src="/images/sixseven.jpeg" width={200} height={150} />
          <div>
            <h5> MATH6767 Theory of Six & Seven </h5>
            <p className="wd-dashboard-course-title">
              Investigates why ppl are obsessed with 6 and 7
            </p>
            <button> Go </button>
          </div>
        </Link>
      </div>
      {/* END */}
    </div>
  );
}
