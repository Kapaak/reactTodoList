import Todo from "./Todo";

const ListOfTodos = ({
	todos,
	error,
	errorMessage = "Oops, there was a problem when connecting to database. Try it again by reloading the page please.",
	handleDelete,
	handleComplete,
}) => {
	return (
		<>
			{error ? (
				<div style={{ color: "white" }}>{errorMessage}</div>
			) : (
				<ul>
					{todos.map((todo, index) => {
						return (
							<Todo
								todo={todo}
								key={index}
								handleDelete={handleDelete}
								handleComplete={handleComplete}
							/>
						);
					})}
				</ul>
			)}
		</>
	);
};

export default ListOfTodos;
