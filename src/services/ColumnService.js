import { httpRequestJson } from "./common";

export const getColumn = async (id) => {
  return httpRequestJson("GET", `column/${id}`);
};
