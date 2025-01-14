export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
  username: {
    id: number;
    username: string;
    email: string;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: number;
  role_name: string;
}

export interface ErrorResponse extends Error {
  response: {
    data: {
      error: string;
    };
  };
  status: number;
  statusText: string;
}

export interface FormValues {
  exam_id: number;
  subject_id: number;
  file: { originFileObj: File }[];
}

export interface Option {
  value: string;
  label: string;
}

export interface SubjectOption {
  id: number;
  name: string;
}

export interface ExamOption {
  id: number;
  exam_code: string;
}

export interface ExamData {
  subject: number;
  exam_code: string;
  duration: number;
  num_questions: number;
}

export interface ExamScheduleData {
  exam: number;
  start_time: string;
  end_time: string;
}
