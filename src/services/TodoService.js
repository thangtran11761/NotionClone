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

export const updateTitleTodoById = async (id, body) => {
  return httpRequestJson("PATCH", `todos/${id}`, body);
};

export const getTodoById = async (id) => {
  return httpRequestJson("GET", `todos/${id}`);
};

export const deleteTodoById = async (id) => {
  return httpRequestJson("DELETE", `todos/${id}`);
};

export const updateListCommentById = async (id, body) => {
  return httpRequestJson("PATCH", `todos/${id}`, body);
};
