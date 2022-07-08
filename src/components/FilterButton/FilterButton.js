import React from 'react';
import styles from './FilterButton.module.css';

function FilterButton(props) {
  return (
    <button
      className={styles.btn}
      type='button'
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span>{props.name}</span>
    </button>
  );
}

export default FilterButton;
