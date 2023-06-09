// const initState = [
// 	{ id: 1, name: 'Learn React', completed: true, priority: 'Medium' },
// 	{ id: 2, name: 'Learn JS', completed: true, priority: 'High' },
// 	{ id: 3, name: 'Learn Next', completed: false, priority: 'Medium' },
// 	{ id: 4, name: 'Learn TS', completed: true, priority: 'Low' },
// 	{ id: 5, name: 'Learn Vue', completed: false, priority: 'Medium' },
// ];

// const TodoListReducer = (state = initState, action) => {
// 	switch (action.type) {
// 		case 'todoList/addTodo':
// 			return [...state, action.payload];
// 		case 'todoList/toggleTodoStatus':
// 			return state.map((todo) =>
// 				todo.id === action.payload
// 					? { ...todo, completed: !todo.completed }
// 					: todo
// 			);

// 		default:
// 			return state;
// 	}
// };

// export default TodoListReducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
	name: 'todoList',
	// initialState: [
	// 	{ id: 1, name: 'Learn React', completed: true, priority: 'Medium' },
	// 	{ id: 2, name: 'Learn JS', completed: true, priority: 'High' },
	// 	{ id: 3, name: 'Learn Next', completed: false, priority: 'Medium' },
	// 	{ id: 4, name: 'Learn TS', completed: true, priority: 'Low' },
	// 	{ id: 5, name: 'Learn Vue', completed: false, priority: 'Medium' },
	// ],
	initialState: { status: 'idle', todos: [] },
	reducers: {
		addTodo: (state, action) => {
			state.push(action.payload);
		},
		toggleTodoStatus: (state, action) => {
			const currentTodo = state.find(
				(todo) => todo.id === action.payload
			);
			if (currentTodo) {
				currentTodo.completed = !currentTodo.completed;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.todo = action.payload;
				state.status = 'idle';
			})
			.addCase(addNewTodo.fulfilled, (state, action) => {
				state.todos.push(action.payload);
			})
			.addCase(updateTodo.fulfilled, (state, action) => {
				let currentTodo = state.todos.find(
					(todo) => todo.id === action.payload
				);
				currentTodo = action.payload;
			});
	},
});

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
	const res = await fetch('/api/todos');
	const data = await res.json();
	return data.todos;
});

export const addNewTodo = createAsyncThunk(
	'todos/addNewTodo',
	async (newTodo) => {
		const res = await fetch('/api/todos', {
			method: 'POST',
			body: JSON.stringify(newTodo),
		});
		const data = await res.json();
		return data.todos;
	}
);

export const updateTodo = createAsyncThunk(
	'todos/updateTodo',
	async (updatedTodo) => {
		const res = await fetch('/api/updateTodo', {
			method: 'POST',
			body: JSON.stringify(updatedTodo),
		});
		const data = await res.json();
		return data.todos;
	}
);
export function addTodos() {
	return function addTodoThunk(dispatch, getState) {};
}
