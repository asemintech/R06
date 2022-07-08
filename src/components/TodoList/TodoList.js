import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './TodoList.module.css';
import { getTodos } from '../../store/todoSlice';
import FilterButton from '../FilterButton/FilterButton';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const filterMap = {
    All: () => true,
    Active: (todo) => !todo.completed,
    Favorite: (todo) => todo.favourite,
    Completed: (todo) => todo.completed,
  };
  
  const filterName = Object.keys(filterMap);

  const filterList = filterName.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <div className={styles.list}>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      {todos.filter(filterMap[filter]).map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
