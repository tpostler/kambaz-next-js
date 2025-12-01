import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;

// this is what I must refactor so that I can POST, GET, DELETE
// this old code touches the old implementation with the database json files
/*
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
*/

export const enrollInCourse = async (courseId: string) => {
  const data = await axiosWithCredentials.post(
    `${USERS_API}/current/courses/${courseId}`,
    {}
  );
  return data;
}

export const unenrollFromCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/current/courses/${courseId}`
  );
  return data;
};

export const findUserEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};