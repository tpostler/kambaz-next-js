import Link from "next/link";
import { FormControl, FormSelect } from "react-bootstrap";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <FormControl
        defaultValue="alice"
        placeholder="username"
        className="wd-username mb-2"
      />
      <FormControl
        defaultValue="123"
        placeholder="password"
        type="password"
        className="wd-password mb-2"
      />
      <FormControl defaultValue="Alice" placeholder="First Name" id="wd-firstname" className="wd-first-name mb-2" />
      <FormControl
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
        className="wd-last-name mb-2"
      />
      
      <FormControl defaultValue="2000-01-01" type="date" id="wd-dob" 
      className="wd-dob mb-2"/>

      <FormControl defaultValue="alice@wonderland" type="email" id="wd-email"
      className="wd-email mb-2" />

      <FormSelect className="wd-role mb-2">
        <option value="USER" defaultChecked>User</option> 
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>
      <Link className="btn btn-danger w-00 mb-2 d-flex justify-content-center" href="Signin"> Sign out </Link>
    </div>
  );
}
