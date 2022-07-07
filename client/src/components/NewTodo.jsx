import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const NewTodo = (props) => {
    const { onAddTodo } = props;

	const saveTodo = () => {
		const country = prompt("New To-do");
		onAddTodo(country);
	};

	return (
        <div>
            <Fab size="small" color="primary" aria-label="add" onClick={saveTodo}>
                <AddIcon/>
            </Fab>
        </div>
	);
};

export default NewTodo;
