import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./components/Todo";
import NewTodo from "./components/NewTodo";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
} from "@mui/material";

const App = () => {
  const [todos, setTodos] = useState([]);

  const apiEndPoint = "http://localhost:3001/api/todos";

  useEffect(() => {
    async function getTodos() {
      const result = await axios(apiEndPoint);
      setTodos(result.data);
    }
    getTodos();
  }, [apiEndPoint]);

  // Handle delete todo
  const handleDelete = async (todo) => {
    const currentTodos = todos;
    setTodos(currentTodos.filter((t) => t._id !== todo._id));

    try {
      await axios.delete(`${apiEndPoint}/${todo._id}`);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log(
          "The record does not exist - it may have already been deleted"
        );
      } else {
        alert("An error occurred while deleting");
        setTodos(currentTodos);
      }
    }
  };

  // Handle add todo
  const handleAdd = async (title) => {
    const { data: post } = await axios.post(apiEndPoint, { title: title });
    setTodos(todos.concat(post));
  };

  // Handle update todo app .. 
  const handleUpdate = async (todo) => {
    todo.title = "To-do";
    await axios.put(apiEndPoint + "/" + todo._id, { title: todo.title });

    const currentTodos = [...todos];
    const index = currentTodos.indexOf[todo];
    currentTodos[index] = { ...currentTodos };
    setTodos(currentTodos);
  };

  return (
    <div>
      <Container>
        <Card variant="outlined" sx={{ mt: 10, mx: "auto", maxWidth: 600 }}>
          <CardHeader
            title="To Do List"
            action={<NewTodo onAddTodo={handleAdd} />}
          />

          <Divider />
          <CardContent>
            {todos.map((todo) => (
              <Todo
                key={todo._id}
                todo={todo}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default App;
