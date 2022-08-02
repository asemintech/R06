import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getTodos = createAsyncThunk('todos/getTodos', async () => {
  const response = await fetch(
    'https://62e7b55693938a545bd77018.mockapi.io/todos'
  );

  if (response) {
    const todos = await response.json();

    return { todos };
  }
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleFavourite: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].favourite = action.payload.favourite;
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    editTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].title = action.payload.title;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodos.pending]: (state, action) => {
      console.log('fetching data');
    },
    [getTodos.fulfilled]: (state, action) => {
      console.log('success');
      return action.payload.todos;
    },
  },
});

export const {
  addTodo,
  toggleFavourite,
  toggleComplete,
  editTodo,
  deleteTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
