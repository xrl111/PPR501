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

export interface ErrorResponse extends Error {
  response: {
    data: {
      error: string;
    };
  };
  status: number;
  statusText: string;
}
