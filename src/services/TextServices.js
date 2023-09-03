import { httpRequestJson } from "./common";

export const getTexts = async () => {
  return httpRequestJson("GET", `text`);
};

export const addText = async (data) => {
  return httpRequestJson("POST", `text`, data);
};
