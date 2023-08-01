import httpRequestJson from "./common";

export const getTodos = async () => {
  return httpRequestJson("GET", "todos");
};

export const addTodo = async (body) => {
  return httpRequestJson("POST", "todos", body);
};
