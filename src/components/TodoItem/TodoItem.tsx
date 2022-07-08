import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './TodoItem.module.css';
import { toggleFavourite, toggleComplete } from '../../store/todoSlice';
import ModalMenu from '../ModalMenu/ModalMenu';

interface ITodoItemProps {
  todo: { 
    id: number; 
    title: string; 
    favourite: boolean;
    completed: boolean;
  };
}

const TodoItem: React.FC<ITodoItemProps> = ({ todo }) => {
  const { id, title, favourite, completed } = todo;
  const [modalMenu, setModalMenu] = useState<boolean>(false);
  const dispatch = useDispatch();

  const ToggleModalMenu = () => setModalMenu(!modalMenu);

  const handleFavourite = (): void => {
    dispatch(toggleFavourite({ id: id, favourite: !favourite }));
    setModalMenu(false);
  };

  const handleComplete = (): void => {
    dispatch(toggleComplete({ id: id, completed: !completed }));
    setModalMenu(false);
  };

  return (
    <li className={`${completed ? styles.completed : ''}`}>
      <span className={styles.checkbox}>
        <input
          type='checkbox'
          checked={completed}
          onChange={handleComplete}
        />
        {title}
      </span>
      <span className={styles.btns}>
      {favourite && (
        <button className={styles.btn} onClick={() => handleFavourite()}>
          <img 
            className={styles.icon} 
            src='https://img.icons8.com/material-rounded/96/000000/hearts.png' 
            alt='Favourite' 
          />
        </button>
      )}
      <button className={styles.btn} onClick={() => ToggleModalMenu()}>
        <img 
          className={styles.icon} 
          src='https://img.icons8.com/small/96/000000/menu-2.png' 
          alt='Menu' 
        />
      </button>
      </span>
      <ModalMenu
        show={modalMenu}
        close={ToggleModalMenu}
        todo={todo}
        handleFavourite={handleFavourite}
        handleComplete={handleComplete}
      />
    </li>
  );
};

export default TodoItem;
