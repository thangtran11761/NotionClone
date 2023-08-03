import { httpRequestJson } from "./common";

export const getTask = async (id) => {
  return httpRequestJson("GET", `tasks/${id}`);
};
