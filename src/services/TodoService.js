import { httpRequestJson } from "./common";

export const getTodos = async () => {
  return httpRequestJson("GET", "todos");
};

export const addTodo = async (body) => {
  return httpRequestJson("POST", "todos", body);
};

export const updateTodoById = async (id, body) => {
  return httpRequestJson("PUT", `todos/${id}`, body);
};

export const getTodoById = async (id) => {
  return httpRequestJson("GET", `todos/${id}`);
};
