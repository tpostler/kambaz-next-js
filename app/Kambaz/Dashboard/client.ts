import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const enrollInCourse = async (courseId: string) => {
  const { data } = await axios.post(
    `${USERS_API}/current/courses/${courseId}/enroll`,
    {},
    { withCredentials: true }
  );
  return data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const { data } = await axios.delete(
    `${USERS_API}/current/courses/${courseId}/enroll`,
    { withCredentials: true }
  );
  return data;
};

export const findUserEnrollments = async () => {
  const { data } = await axios.get(
    `${USERS_API}/current/enrollments`,
    { withCredentials: true }
  );
  return data;
};