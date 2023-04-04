const initState = [
	{ id: 1, name: 'Learn React', completed: true, priority: 'Medium' },
	{ id: 2, name: 'Learn JS', completed: true, priority: 'High' },
	{ id: 3, name: 'Learn Next', completed: false, priority: 'Medium' },
	{ id: 4, name: 'Learn TS', completed: true, priority: 'Low' },
	{ id: 5, name: 'Learn Vue', completed: false, priority: 'Medium' },
];

const TodoListReducer = (state = initState, action) => {
	switch (action.type) {
		case 'todoList/addTodo':
			return [...state, action.payload];
		case 'todoList/toggleTodoStatus':
			return state.map((todo) =>
				todo.id === action.payload
					? { ...todo, completed: !todo.completed }
					: todo
			);

		default:
			return state;
	}
};

export default TodoListReducer;
