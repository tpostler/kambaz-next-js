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
        
      {/* My added courses */}
      {/* COURSE 2 */}
      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
      <Card>
        <Link href="/Kambaz/Courses/1001" className="wd-dashboard-course-link text-decoration-none text-dark">
          <CardImg variant="top"
          src="/images/marketing.jpg" width="100%" height={150} />
          <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> MKT1001 Intro Marketing </CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>Learn Marketing</CardText>
            <Button variant="primary">Go</Button>
          </CardBody>
        </Link>
        </Card>
      </Col>
      {/* COURSE 3 */}
      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
      <Card>
        <Link href="/Kambaz/Courses/1002" className="wd-dashboard-course-link text-decoration-none text-dark">
          <CardImg variant="top"
          src="/images/analytics.jpg" width="100%" height={150} />
          <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> MISM1002 Intro to Analytics </CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>Learn Analytics</CardText>
            <Button variant="primary">Go</Button>
          </CardBody>
        </Link>
        </Card>
      </Col>
      {/* COURSE 4 */}
      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
      <Card>
        <Link href="/Kambaz/Courses/2550" className="wd-dashboard-course-link text-decoration-none text-dark">
          <CardImg variant="top"
          src="/images/computer.jpg" width="100%" height={150} />
          <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS2550 Object Oriented Design </CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>Objects! In code?!?</CardText>
            <Button variant="primary">Go</Button>
          </CardBody>
        </Link>
        </Card>
      </Col>
      {/* COURSE 5 */}
      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
        <Card>
        <Link href="/Kambaz/Courses/5000" className="wd-dashboard-course-link text-decoration-none text-dark">
          <CardImg variant="top"
           src="/images/yapping.jpeg" width="100%" height={150} />
          <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> PPL5000 Small Talk & Yapping </CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
              Lock in on your yapping and small talk
            </CardText>
            <Button variant="primary">Go</Button>
          </CardBody>
        </Link>
        </Card>
      </Col>
      {/* COURSE 6 */}
      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
        <Card>
        <Link href="/Kambaz/Courses/4505" className="wd-dashboard-course-link text-decoration-none text-dark">
          <CardImg variant="top"
           src="/images/math.jpeg" width="100%" height={150} />
          <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> MATH4505 Intro. Adv. Math </CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
              Super hard math class. No for the weak.
            </CardText>
            <Button variant="primary">Go</Button>
          </CardBody>
        </Link>
        </Card>
      </Col>
      {/* COURSE 7 */}
      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
      <Card>
        <Link href="/Kambaz/Courses/3456" className="wd-dashboard-course-link text-decoration-none text-dark">
          <CardImg variant="top"
          src="/images/figma.jpg" width="100%" height={150} />
          <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> DSG3456 Intro. Figma </CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}> Learn Figma!</CardText>
            <Button variant="primary">Go</Button>
          </CardBody>
        </Link>
        </Card>
      </Col>

      {/* COURSE 8 */}
      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
      <Card>
        <Link href="/Kambaz/Courses/6767" className="wd-dashboard-course-link text-decoration-none text-dark">
          <CardImg variant="top"
          src="/images/sixseven.jpeg" width="100%" height={150} />
          <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> MATH6767 Theory of Six & Seven </CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
              Investigates why ppl are obsessed with 6 and 7
            </CardText>
            <Button variant="primary">Go</Button>
          </CardBody>
        </Link>
        </Card>
      </Col>
      </Row>
    </div>
    </div>
  );
}
