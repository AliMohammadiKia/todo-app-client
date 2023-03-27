import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getTodos = async () => {
  const todos = await axios.get("/");
  return todos.data;
};
export const getTodo = async (id) => {
  const todo = await axios.get(`/${id}`);
  return todo.data;
};
export const createTodo = async (newTodo) => {
  const todo = await axios.post("/create", newTodo);
  return todo.data;
};
export const deleteTodo = async (id) => {
  const result = await axios.delete(`/${id}`);
  return result.data;
};
export const EditTodo = async (id, newTodo) => {
  const result = await axios.patch(`/${id}`, newTodo);
  return result.data;
};
