import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const findQuizzesForCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
    return data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
    const { data } = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/quizzes`,
        quiz
    );
    return data;
};

export const findQuiz = async (courseId: string, quizId: string) => {
    const { data } = await axiosWithCredentials.get(
        `${COURSES_API}/${courseId}/quizzes/${quizId}`);
    return data;
};

export const updateQuiz = async (courseId: string, quiz: any) => {
    const { data } = await axiosWithCredentials.put(
        `${COURSES_API}/${courseId}/quizzes/${quiz._id}`,
        quiz);
    return data;
};

export const deleteQuiz = async (courseId: string, quizId: string) => {
    const { data } = await axiosWithCredentials.delete(
        `${COURSES_API}/${courseId}/quizzes/${quizId}`);
    return data;
};

export const publishQuiz = async (courseId: string, quizId: string, quiz: any) => {
    const { data } = await axiosWithCredentials.put(
        `${COURSES_API}/${courseId}/quizzes/${quizId}/publish`,
        quiz);
    return data;
};

export const findQuestions = async(courseId: string, quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions`);
    return data;
};

export const createQuestion = async(courseId: string, quizId: string, question: any) => {
    const { data } = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/quizzes/${quizId}/questions`,
        question
    );
    return data;
};

export const updateQuestion = async(courseId: string, quizId: string, question: any) => {
    const { data } = await axiosWithCredentials.put(
        `${COURSES_API}/${courseId}/quizzes/${quizId}/questions/${question._id}`,
        question
    );
    return data;
};

export const deleteQuestion = async(courseId: string, quizId: string, questionId: string) => {
    const { data } = await axiosWithCredentials.delete(
        `${COURSES_API}/${courseId}/quizzes/${quizId}/questions/${questionId}`
    );
    return data;
};

export const findAttemptsForQuizForStudent = async(courseId: string, quizId: string) => {
    const { data } = await axiosWithCredentials.get(
         `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts/me`
    );
    return data;
 }

export const createAttempt = async(courseId: string, quizId: string, answers: { questionId: string, answerId: string }[]) => {
    const { data } = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts`,
        { answers }
    );
    return data;
}