import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './TodoForm.module.css';
import { addTodo } from '../../store/todoSlice';

const CHAR_LIMIT = 160;

const TodoForm: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const dispatch = useDispatch();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodo.trim().length === 0) return;

    fetch('https://62e7b55693938a545bd77018.mockapi.io/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        title: newTodo,
        favourite: false,
        completed: false,
        createdAt: new Date().toLocaleString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => dispatch(addTodo(data)))
      .catch((error) => console.log(error));

    setNewTodo('');
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo(event.currentTarget.value);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        className={styles.input}
        type='text'
        maxLength={CHAR_LIMIT}
        value={newTodo}
        onChange={onChange}
        placeholder=''
      />
      <button className={styles.btn} type='submit'>
        +
      </button>
    </form>
  );
};

export default TodoForm;
