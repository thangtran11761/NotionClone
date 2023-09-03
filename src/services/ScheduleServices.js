import { httpRequestJson } from "./common";

export const getSchedules = async () => {
  return httpRequestJson("GET", `schedule`);
};

export const addSchedule = async (data) => {
  return httpRequestJson("POST", `schedule`, data);
};
