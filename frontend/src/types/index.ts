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
