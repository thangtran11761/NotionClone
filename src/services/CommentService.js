import { httpRequestJson } from "./common";

export const getCommentById = async (id) => {
  return httpRequestJson("GET", `comments/${id}`);
};
