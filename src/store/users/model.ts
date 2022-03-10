export interface LoginModel {
  userName: string;
  password: string;
}

export interface Profile {
  id: number;
  userName: string;
  password: string;
  name: string;
  role: string;
  status: boolean;
}

export interface UserModel {
  name: string;
  userName: string;
  password: string;
  role: string;
}

export interface UserViewModel {
  id: number;
  name: string;
  role: string;
}
