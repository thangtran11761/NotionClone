import { httpRequestJson } from "./common";

export const getPages = async () => {
  return httpRequestJson("GET", "pages");
};

export const addPages = async (data) => {
  return httpRequestJson("POST", "pages", data);
};

export const removePages = async (id) => {
  return httpRequestJson("DELETE", `pages/${id}`);
};

export const editPages = async (data) => {
  return httpRequestJson("PUT", "pages", data);
};
