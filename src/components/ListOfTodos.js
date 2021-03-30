import Todo from "./Todo";

const ListOfTodos = ({
	todos,
	error,
	errorMessage = "Oops, there was a problem when connecting to database",
	handleDelete,
	handleComplete,
}) => {
	return (
		<>
			{error ? (
				<div>{errorMessage}</div>
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
