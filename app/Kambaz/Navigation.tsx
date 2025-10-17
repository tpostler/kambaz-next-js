"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();
  const links = [
    { label: "Dashboard", path: "/Kambaz/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Kambaz/Dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/Kambaz/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Kambaz/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroupItem
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        action
        className="bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      {/* changing this to get rid of  */}
      <Link href="/Kambaz/Account" style={{ textDecoration: 'none' }}>
        <ListGroupItem
          as="div"
          href="/Kambaz/Account"
          className={`text-center border-0 bg-black
            ${
              pathname.includes("Account")
                ? "bg-white text-danger"
                : "bg-black text-white"
            }`}
        >
          <FaRegCircleUser
            className={`fs-1 ${
              pathname.includes("Account") ? "text-danger" : "text-white"
            }`}
          />
          <br />
          Account
        </ListGroupItem>
      </Link>

      {/* i had to change to label to stop getting the runtime error */}
      {links.map((link) => (
        <ListGroupItem
          key={link.label}
          as={Link}
          href={link.path}
          className={`bg-black text-center border-0
              ${
                pathname.includes(link.label)
                  ? "text-danger bg-white"
                  : "text-white bg-black"
              }`}
        >
          {link.icon({ className: "fs-1 text-danger" })}
          <br />
          {link.label}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
{
  /* OLD CODE - DEAD CODE
      <ListGroupItem
        className={`border-0 text-center ${
          pathname.includes("/Account") ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Kambaz/Account/Signin"
          id="wd-account-link"
          className={`text-decoration-none ${
            pathname.includes("/Account") ? "text-danger" : "text-white"
          }`}
        >
          <FaRegCircleUser
            className={`fs-1 ${
              pathname.includes("/Account") ? "text-danger" : "text-white"
            }`}
          />
          <br />
          Account
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${
          pathname.includes("/Dashboard") ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Kambaz/Dashboard"
          id="wd-dashboard-link"
          className={`text-decoration-none ${
            pathname.includes("/Dashboard") ? "text-danger" : "text-white"
          }`}
        >
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${
          pathname.includes("/Courses") ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Kambaz/Courses"
          id="wd-courses-link"
          className={`text-decoration-none ${
            pathname.includes("/Courses") ? "text-danger" : "text-white"
          }`}
        >
          <LiaBookSolid className="fs-1 text-danger" />
          <br />
          Courses
        </Link>
      </ListGroupItem>

      <ListGroupItem
        className={`border-0 text-center ${
          pathname.includes("/Calendar") ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Kambaz/Calendar"
          id="wd-calendar-link"
          className={`text-decoration-none ${
            pathname.includes("/Calendar") ? "text-danger" : "text-white"
          }`}
        >
          <IoCalendarOutline className="fs-1 text-danger" />
          <br />
          Calendar
        </Link>
      </ListGroupItem>

      <ListGroupItem
        className={`border-0 text-center ${
          pathname.includes("/Inbox") ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Kambaz/Inbox"
          id="wd-inbox-link"
          className={`text-decoration-none ${
            pathname.includes("/Inbox") ? "text-danger" : "text-white"
          }`}
        >
          <FaInbox className="fs-1 text-danger" />
          <br />
          Inbox
        </Link>
      </ListGroupItem>

      <ListGroupItem
        className={`border-0 text-center ${
          pathname.includes("/Labs") ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Labs"
          id="wd-labs-link"
          className={`text-decoration-none ${
            pathname.includes("/Labs") ? "text-danger" : "text-white"
          }`}
        >
          <LiaCogSolid className="fs-1 text-danger" />
          <br />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
} */
}
