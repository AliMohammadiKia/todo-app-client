import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoDB } from "../../redux/actions/todosAction";

export const FormAddTodo = () => {
  const dispatch = useDispatch();
  const [taskInput, setTaskInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && taskInput.trim()) {
      handleAddTodo();
    }
  };

  const handleAddTodo = () => {
    if (taskInput.trim()) {
      dispatch(addTodoDB({ task: taskInput.trim() }));
      setTaskInput("");
    }
  };

  return (
    <Stack
      direction="row"
      spacing="0.5rem"
      alignItems="center"
      mb="2rem"
      mx="auto"
    >
      <TextField
        variant="outlined"
        label="Example Todo ..."
        size="small"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button variant="contained" onClick={handleAddTodo}>
        Add Todo
      </Button>
    </Stack>
  );
};
