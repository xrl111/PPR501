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
  user: {
    id: number;
    username: string;
    email: string;
    role: number;
    role_name: string;
  };
  message: string;
  status: string;
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

export interface Exam extends Option {
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
  subject: number;
}

export interface ExamData {
  id: number;
  exam_code: string;
  duration: number;
  num_questions: number;
  subject: number;
  subject_name: string;
}

export interface ExamScheduleData {
  exam: string;
  start_time: string;
  end_time: string;
}
export interface ShowExamScheduleData {
  id: number;
  exam: number;
  is_active: string;
  start_time: string;
  end_time: string;
}
export interface DecodedToken {
  exp: number;
}
