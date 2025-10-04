import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl id="wd-username" placeholder="username (email)" 
      className="mb-2"/>
      <FormControl id="wd-password" placeholder="password - 8 char" type="password"
      className="mb-2" />
      <Link id="wd-signin-btn" href="Profile"
      className="btn btn-primary w-00 mb-2 d-flex justify-content-center"> Sign in </Link>
      <Link id="wd-signup-link" href="Signup"> Sign up </Link>
    </div>
  );
}
