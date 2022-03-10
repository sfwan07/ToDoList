import { GroupModel, TaskModel } from "../model";
import {
  GROUP_ADD,
  GROUP_EDIT,
  GROUP_REMOVE,
  GROUP_ALL,
  GROUP_GET,
  GROUP_GET_BY_USER,
  GET_TASKS_BY_USER,
} from "./actionType";

export const addGroup = (
  data: GroupModel,
  callBack: (res?: any, err?: any) => void,
) => {
  return {
    type: GROUP_ADD,
    payload: { ...data },
    callBack: callBack,
  };
};

export const editGroup = (
  data: GroupModel,
  callBack: (res?: any, err?: any) => void,
) => {
  return {
    type: GROUP_EDIT,
    payload: { ...data },
    callBack: callBack,
  };
};

export const removeGroup = (
  id: number,
  callBack: (res?: any, err?: any) => void,
) => {
  return {
    type: GROUP_REMOVE,
    payload: id,
    callBack: callBack,
  };
};

export const allGroups = () => {
  return {
    type: GROUP_ALL,
  };
};

export const getGroup = (id: number) => {
  return {
    type: GROUP_GET,
    payload: id,
  };
};

export const getGroupsByUser = (userId: number) => {
  return {
    type: GROUP_GET_BY_USER,
    payload: userId,
  };
};

export const getTasksByUser = (userId: number) => {
  return {
    type: GET_TASKS_BY_USER,
    payload: userId,
  };
};
