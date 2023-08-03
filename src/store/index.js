import { createStore } from "redux";

import { addPages, removePages, editPages } from "../services/PageService";

const initialState = { activity: true };

const pageReducer = (state = initialState, action) => {
  if (action.type === "addPage") {
    addPages(action.data).then((res) => console.log(res));
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
