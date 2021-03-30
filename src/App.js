import React, { useState, useEffect } from "react";
//libraries
import axios from "axios";
import toast from "react-hot-toast";
//components
import Form from "./components/Form";
import ListOfTodos from "./components/ListOfTodos";
//styles
import { FlexContainer } from "./styles/GlobalStyles";

const fetchData = async (setTodos, setError) => {
	try {
		const resp = await axios.get("http://localhost:3001/todos");
		const data = await resp.data;
		setTodos(data);
	} catch (err) {
		setError(true);
	}
};

function App() {
	const [todos, setTodos] = useState([]);
	const [error, setError] = useState(false);
	const notifySubmit = text => toast.success(text);
	const notifyError = text => toast.error(text);

	useEffect(() => {
		fetchData(setTodos, setError);
	}, []);

	const handleSubmit = async (name, date) => {
		try {
			const resp = await axios.post("http://localhost:3001/todos", {
				name,
				date,
				completed: false,
			});
			if (resp.statusText === "Created") {
				setTodos(prevTodos => [...prevTodos, { name, date, completed: false }]);
				fetchData(setTodos, setError);
				notifySubmit("Submited");
			}
		} catch (err) {
			notifyError(err.message);
		}
	};

	const handleDelete = async id => {
		try {
			const resp = await axios.delete(`http://localhost:3001/todos/${id}`);
			if (resp.statusText === "OK") {
				const newTodos = [...todos].filter(todo => todo.id !== id);
				setTodos(newTodos);
				notifySubmit("Successfully deleted");
			}
		} catch (err) {
			notifyError(err.message);
		}
	};

	const handleComplete = async todo => {
		const newTodo = { ...todo, completed: !todo.completed };

		try {
			const resp = await axios.put(
				`http://localhost:3001/todos/${todo.id}`,
				newTodo
			);

			if (resp.statusText === "OK") {
				const newTodos = [...todos];
				newTodos.map(el =>
					el === todo ? (el.completed = !el.completed) : null
				);
				setTodos(newTodos);
				notifySubmit("Task updated!");
			}
		} catch (err) {
			notifyError(err.message);
		}
	};

	return (
		<FlexContainer>
			<h1>This is my todo list</h1>
			<div>
				<Form handleSubmit={handleSubmit} />
				<ListOfTodos
					todos={todos}
					error={error}
					errorMessage={"damn you internet connection !!"}
					handleDelete={handleDelete}
					handleComplete={handleComplete}
				/>
			</div>
		</FlexContainer>
	);
}

export default App;
