import { createStore } from "redux";

import { addPages, removePages, editPages } from "../services/PageService";
import { addTask } from "../services/TaskService";
import { addText } from "../services/TextServices";
import { addSchedule } from "../services/ScheduleServices";
import { addProject } from "../services/ProjectServices";

const initialState = { activity: true };

const pageReducer = (state = initialState, action) => {
  if (action.type === "addPage") {
    addPages(action.data).then((res) => {
      if (res.type === "task") {
        addTask({ column: [], idPage: res.id, name: res.name });
      }
      if (res.type === "text") {
        addText({ idPage: res.id, name: res.name });
      }
      if (res.type === "schedule") {
        addSchedule({ idPage: res.id, name: res.name });
      }
      if (res.type === "project") {
        addProject({ idPage: res.id, name: res.name });
      }
    });
    return { activity: !state.activity };
  }

  if (action.type === "removePage") {
    removePages(action.data.id).then((res) => console.log(res));
    return { activity: !state.activity };
  }

  if (action.type === "editPage") {
    editPages(action.data).then((res) => console.log(res));
    return { activity: !state.activity };
  }

  if (action.type === "addColumn") {
  }

  return state;
};
const store = createStore(pageReducer);

export default store;
