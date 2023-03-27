import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Stack, Typography } from "@mui/material";
import { Todo, FormAddTodo } from "./";
import { fetchTodos } from "../../redux/actions/todosAction";

export const Todos = () => {
  const dispatch = useDispatch();

  const { data, status, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <Container sx={{ py: "1rem" }}>
      <Stack>
        <FormAddTodo />
        {status === "loading" ? (
          <img
            src={process.env.PUBLIC_URL + "/loading.gif"}
            style={{ width: "200px", margin: "0 auto" }}
          />
        ) : status === "error" ? (
          <Typography variant="body1" color="error" sx={{ mx: "auto" }}>
            error is: {error}
          </Typography>
        ) : (
          Object.values(data).map((todo) => (
            <Todo key={todo._id} todoProps={todo} />
          ))
        )}
      </Stack>
    </Container>
  );
};
