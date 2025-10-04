import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h1>Signup</h1>
      <FormControl 
      placeholder="username" 
      id="wd-username" 
      className="mb-2"/>

      <FormControl
        placeholder="password"
        type="password"
        id="wd-password"
        className="mb-2"
      />

      <FormControl
        placeholder="verify password"
        type="password"
        id="wd-password-verify"
        className="mb-2"
      />
      <Link
        id="wd-signin-btn"
        href="Profile"
        className="btn btn-primary w-00 mb-2 d-flex justify-content-center"
      >
        Sign up
      </Link>
      
      <Link id="wd-signup-link" href="Signup">
        {" "}
        Sign in{" "}
      </Link>
    </div>
  );
}
