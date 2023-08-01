import httpRequestJson from "./common";

export const getPages = async () => {
  return httpRequestJson("GET", "pages");
};
