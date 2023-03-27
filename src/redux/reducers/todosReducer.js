import { produce } from "immer";
import { todosActionType } from "../actions/todosAction";

const initialState = {
  data: {},
  status: "idle",
  error: "",
};

const todosReducer = produce((state, action) => {
  switch (action.type) {
    case todosActionType.addTodo:
      state.data[action.payload._id] = action.payload;
      break;
    case todosActionType.removeTodo:
      delete state.data[action.payload];
      break;
    case todosActionType.updateTodo:
      const { id, newTodo } = action.payload;
      const todo = state.data[id];
      state.data[id] = { ...todo, ...newTodo };
      break;
    case todosActionType.todosLoading:
      state.status = "loading";
      break;
    case todosActionType.todosSuccess:
      const newData = {};
      action.payload.map((todo) => {
        newData[todo._id] = todo;
      });
      state.status = "idle";
      state.data = { ...state.data, ...newData };
      break;
    case todosActionType.todosError:
      state.status = "error";
      state.error = action.payload;
  }
}, initialState);

export default todosReducer;
