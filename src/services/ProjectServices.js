import { httpRequestJson } from "./common";

export const getProjects = async () => {
  return httpRequestJson("GET", `project`);
};

export const addProject = async (data) => {
  return httpRequestJson("POST", `project`, data);
};
