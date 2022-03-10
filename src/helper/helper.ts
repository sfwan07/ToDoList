import { Profile } from "../store/model";

export const isAuth = localStorage.getItem("profile") != undefined;

export const getProfile = (): Profile | undefined => {
  let data = localStorage.getItem("profile");
  if (data) return JSON.parse(data);
  else return undefined;
};

export const hasRole = (roles: string[]) => {
  const profile = getProfile();
  return (
    profile && roles && roles.filter(i => profile.role.includes(i)).length > 0
  );
};

export const uniqueArrayOfObject = (data: any[], key: string) => {
  return data.filter((c, index) => {
    return data.findIndex(item => item[key] == c[key]) === index;
  });
};
