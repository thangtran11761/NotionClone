import { httpRequestJson } from "./common";

export const getCommentById = async (id) => {
  return httpRequestJson("GET", `comments/${id}`);
};

export const updateContentCommentById = async (id, body) => {
  return httpRequestJson("PATCH", `comments/${id}`, body);
};
