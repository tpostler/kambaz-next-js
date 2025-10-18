"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
  const { cid } = useParams();
  const pathname = usePathname();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  console.log("LOOK HERE: ", cid);
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          href={`/Kambaz/Courses/${cid}/${link}`}
          // I got super confused when implementing this so I got className
          // code from Claude
          className={`list-group-item border border-0 ${
            pathname === `/Kambaz/Courses/${cid}}/${link}` ||
            pathname.startsWith(`/Kambaz/Courses/${cid}/${link}/`)
              ? "active text-black"
              : "text-danger" }`}>
          {link}
        </Link>
      ))}
    </div>
  );
}