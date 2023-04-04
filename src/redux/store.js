// import { createStore } from 'redux';
// import rootReducer from './reducer';
// import { composeWithDevTools } from 'redux-devtools-extension';

// const composedEnhancers = composeWithDevTools();

// const store = createStore(rootReducer, composedEnhancers);

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import { filtersSlice as filtersReducer } from '../components/Filters/filtersSlice';
import { todosSlice as todoListReducer } from '../components/TodoList/todosSlice';
const store = configureStore({
	reducer: {
		filters: filtersReducer.reducer,
		todoList: todoListReducer.reducer,
	},
});

export default store;
