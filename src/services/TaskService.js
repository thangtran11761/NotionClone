import { httpRequestJson } from "./common";

export const getTasks = async () => {
  return httpRequestJson("GET", `task`);
};

export const addTask = async (data) => {
  return httpRequestJson("POST", `task`, data);
};
