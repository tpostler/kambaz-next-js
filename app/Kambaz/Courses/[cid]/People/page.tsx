"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as Coureseclient from "../../client";

export default function CoursePeople() {
  const { cid } = useParams<{ cid: string }>();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (!cid) return;
    try {
      const enrolledUsers = await Coureseclient.findUsersForCourse(cid);
      setUsers(enrolledUsers);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div className="wd-people-page">
      <h2 className="wd-people-header">People </h2>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
