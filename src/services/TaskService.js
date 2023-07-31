import httpRequestJson from "./common";

export const getTasks = async () => {
  return httpRequestJson("GET", "tasks");
};

export const addTask = async (body) => {
  return httpRequestJson("POST", "tasks", body);
};
