import Link from "next/link";
export default function Labs() {
  return (
    <div id="wd-labs">
      <h2>Submission Info</h2>
      <p><b>Name:</b> Victoria Postler<br/><b>Section:</b> CS4550 (Online)<br/>
      <b>GitHub Repo:</b> <a href="https://github.com/tpostler/kambaz-next-js">Link</a>
      </p>
      <h1>Labs</h1>
      <ul>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link">
            Lab 1: HTML Examples{" "}
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link">
            Lab 2: CSS Basics{" "}
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
}
