"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button} from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  //console.log("REACHED 1");
  const signin = () => {
    //console.log("REACHED?");
    const user = db.users.find(
     (u: any) =>
      u.username === credentials.username &&
      u.password === credentials.password
   );
   if (!user) return;

   dispatch(setCurrentUser(user));
   console.log("SIGNIN user: ", user);
   redirect("/Kambaz/Dashboard"); // this line may need to change to get it to work
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl defaultValue={credentials.username}
      onChange={(e) => setCredentials({...credentials, username: e.target.value })}
      className="mb-2"
      placeholder="username" 
      id="wd-username" />

      <FormControl defaultValue={credentials.password}
      onChange={(e) => setCredentials({...credentials, password: e.target.value })}
      className="mb-2"
      placeholder="password - 8 char"
      type="password"
      id="wd-password" />

      
      <Button onClick={signin} 
      id="wd-signin-btn"
      className="btn btn-primary w-100 mb-2 d-flex justify-content-center"> 
       Sign in </Button>
      <Link id="wd-signup-link" href="Signup"> Sign up </Link>
    </div>
  );
}
