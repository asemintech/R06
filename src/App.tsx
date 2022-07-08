import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';

function App() {
  return (
    <Provider store={store}>
      <div className='app'>
        <h1 className='title'>todos</h1>
        <div className='container'>
          <TodoForm />
        </div>
        <div className='container'>
          <TodoList />
        </div>
      </div>
    </Provider>
  );
}

export default App;
