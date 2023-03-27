import { createTodo, deleteTodo, EditTodo, getTodos } from "../../api/todosApi";

export const todosActionType = {
  addTodo: "todos/addTodo",
  removeTodo: "todos/removeTodo",
  updateTodo: "todos/updateTodo",
  todosLoading: "todos/todosLoading",
  todosSuccess: "todos/todosSuccess",
  todosError: "todos/todosError",
};

export const addTodo = (newTodo) => ({
  type: todosActionType.addTodo,
  payload: newTodo,
});
export const removeTodo = (id) => ({
  type: todosActionType.removeTodo,
  payload: id,
});
export const updateTodo = (id, newTodo) => ({
  type: todosActionType.updateTodo,
  payload: { id, newTodo },
});

export const todosLoading = () => ({
  type: todosActionType.todosLoading,
});
export const todosSuccess = (todos) => ({
  type: todosActionType.todosSuccess,
  payload: todos,
});
export const todosError = (errorMessage) => ({
  type: todosActionType.todosError,
  payload: errorMessage,
});

export const fetchTodos = () => {
  return async (dispatch) => {
    dispatch(todosLoading());
    try {
      const todos = await getTodos();
      dispatch(todosSuccess(todos));
    } catch (error) {
      dispatch(todosError(error.message));
    }
  };
};
export const addTodoDB = (newTodo) => {
  return async (dispatch) => {
    const todo = await createTodo(newTodo);
    dispatch(addTodo(todo));
  };
};
export const removeTodoDB = (id) => {
  return async (dispatch) => {
    await deleteTodo(id);
    dispatch(removeTodo(id));
  };
};
export const updateTodoDB = (id, newTodo) => {
  return async (dispatch) => {
    await EditTodo(id, newTodo);
    dispatch(updateTodo(id, newTodo));
  };
};
