import { LoginModel, UserModel } from "../model";
import {
  LOGIN,
  USERS_ADD,
  USERS_EDIT,
  USERS_REMOVE,
  USERS_ENABLE,
} from "./actionType";

export const login = (
  data: LoginModel,
  callBack: (res?: any, err?: any) => void,
) => {
  return {
    type: LOGIN,
    payload: { ...data },
    callBack: callBack,
  };
};

export const addUser = (
  data: UserModel,
  callBack: (res?: any, err?: any) => void,
) => {
  return {
    type: USERS_ADD,
    payload: { ...data },
    callBack: callBack,
  };
};

export const editUser = (
  id: number,
  data: UserModel,
  callBack: (res?: any, err?: any) => void,
) => {
  return {
    type: USERS_EDIT,
    id: id,
    payload: { ...data },
    callBack: callBack,
  };
};

export const removeUser = (
  id: number,
  callBack: (res?: any, err?: any) => void,
) => {
  return {
    type: USERS_REMOVE,
    payload: id,
    callBack: callBack,
  };
};

export const enableUser = (
  id: number,
  callBack: (res?: any, err?: any) => void,
) => {
  return {
    type: USERS_ENABLE,
    payload: id,
    callBack: callBack,
  };
};
