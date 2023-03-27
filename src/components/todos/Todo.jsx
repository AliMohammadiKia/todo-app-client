import {
  Stack,
  Typography,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import { Edit, Delete, CircleOutlined, CheckCircle } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodoDB, removeTodoDB } from "../../redux/actions/todosAction";
import { ModalComponent } from "../modal";

export const Todo = ({ todoProps }) => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState(todoProps);
  const [editTodo, setEditTodo] = useState(null);
  const [inputEditTodo, setInputEditTodo] = useState("");
  const [modal, setModal] = useState(false);

  const handleTaskDone = () => {
    dispatch(updateTodoDB(todo._id, { completed: !todo.completed }));
    setTodo({ ...todo, completed: !todo.completed });
  };

  const handleDeleteTodo = () => {
    dispatch(removeTodoDB(todo._id));
    handleCloseModal();
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setInputEditTodo(todo.task);
    handleOpenModal();
  };

  const handleUpdateTodo = () => {
    dispatch(updateTodoDB(editTodo._id, { task: inputEditTodo }));
    setEditTodo({});
    setInputEditTodo("");
    handleCloseModal();
    window.location.reload();
  };

  const handleCancelEditTodo = () => {
    setEditTodo({});
    setInputEditTodo("");
    handleCloseModal();
  };

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
    setEditTodo(null);
    setInputEditTodo("");
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mx="10rem"
      my="0.25rem"
      px="1rem"
      py="0.5rem"
      bgcolor="#f1f2f6"
      borderRadius=".25rem"
    >
      <Stack direction="row" alignItems="center" spacing="0.5rem">
        <IconButton onClick={handleTaskDone}>
          {todo.completed ? (
            <CheckCircle color="success" />
          ) : (
            <CircleOutlined />
          )}
        </IconButton>
        <Typography
          variant="body1"
          onClick={handleTaskDone}
          color={todo.completed ? "#888" : "#333"}
          sx={{
            cursor: "pointer",
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.task}
        </Typography>
      </Stack>
      <Stack direction="row" spacing="0.5rem">
        <IconButton color="warning" onClick={() => handleEditTodo(todo)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={handleOpenModal}>
          <Delete />
        </IconButton>
      </Stack>

      <ModalComponent openModal={modal} handleCloseModal={handleCloseModal}>
        {editTodo ? (
          <>
            <Typography>Edit todo task</Typography>
            <TextField
              variant="outlined"
              size="small"
              value={inputEditTodo}
              onChange={(e) => setInputEditTodo(e.target.value)}
            />
            <Stack
              spacing="0.25rem"
              direction="row"
              justifyContent="center"
              mt="1rem"
            >
              <Button
                onClick={handleCancelEditTodo}
                variant="contained"
                color="error"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateTodo}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Typography>Are you sure you want to delete this task?</Typography>
            <Stack
              spacing="0.25rem"
              direction="row"
              justifyContent="center"
              mt="1rem"
            >
              <Button
                onClick={handleDeleteTodo}
                variant="contained"
                color="error"
              >
                Yes
              </Button>
              <Button
                onClick={handleCloseModal}
                variant="contained"
                color="primary"
              >
                No
              </Button>
            </Stack>
          </>
        )}
      </ModalComponent>
    </Stack>
  );
};
