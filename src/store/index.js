import { createStore } from "redux";

import { addPages, removePages, editPages } from "../services/PageService";

const initialState = { activity: true };

const pageReducer = (state = initialState, action) => {
  if (action.type === "add") {
    addPages(action.data).then((res) => console.log(res));
    return { activity: !state.activity };
  }

  if (action.type === "remove") {
    removePages(action.data.id).then((res) => console.log(res));
    return { activity: !state.activity };
  }

  if (action.type === "edit") {
    editPages(action.data).then((res) => console.log(res));
    return { activity: !state.activity };
  }

  return state;
};
const store = createStore(pageReducer);

export default store;
