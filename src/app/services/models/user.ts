export interface UserRequest {
  userName: string;
  password: string;
}


export interface LoginInfo{
  token: string;
  user: User;
}

export interface User{
  userName: string;
  age: number;
}