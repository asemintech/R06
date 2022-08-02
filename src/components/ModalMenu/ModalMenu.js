import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './ModalMenu.module.css';
import ModalDelete from '../ModalDelete/ModalDelete';
import ModalEdit from '../ModalEdit/ModalEdit';
import favoriteFilled from '../../icons/favorite-icon-filled.png';
import favorite from '../../icons/favorite-icon.png';
import undo from '../../icons/return-icon.png';
import checkmark from '../../icons/done-icon.png';
import edit from '../../icons/edit-icon.png';
import remove from '../../icons/remove-icon.png';

const ModalMenu = ({ show, close, todo, handleComplete, handleFavourite }) => {
  const { completed, favourite } = todo;
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const ToggleModalDelete = () => setModalDelete(!modalDelete);
  const ToggleModalEdit = () => setModalEdit(!modalEdit);

  return ReactDOM.createPortal(
    <>
      {show && (
        <div
          className={`${styles.modal} ${styles.show}`}
          onClick={() => close()}
        >
          <div className={styles.content} onClick={(e) => e.stopPropagation()}>
            <div className={styles.btns}>
              {favourite ? (
                <button className={styles.btn} onClick={handleFavourite}>
                  <img
                    className={styles.icon}
                    src={favoriteFilled}
                    alt='Favorite'
                  />
                </button>
              ) : (
                <button className={styles.btn} onClick={handleFavourite}>
                  <img className={styles.icon} src={favorite} alt='Favorite' />
                </button>
              )}
              {completed ? (
                <button className={styles.btn} onClick={handleComplete}>
                  <img className={styles.icon} src={undo} alt='Return' />
                </button>
              ) : (
                <button className={styles.btn} onClick={handleComplete}>
                  <img className={styles.icon} src={checkmark} alt='Done' />
                </button>
              )}
              <button className={styles.btn} onClick={() => ToggleModalEdit()}>
                <img className={styles.icon} src={edit} alt='Edit' />
              </button>
              <button
                className={styles.btn}
                onClick={() => ToggleModalDelete()}
              >
                <img className={styles.icon} src={remove} alt='Delete' />
              </button>
            </div>
            <ModalEdit show={modalEdit} close={ToggleModalEdit} todo={todo} />
            <ModalDelete
              show={modalDelete}
              close={ToggleModalDelete}
              todo={todo}
            />
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal')
  );
};

export default ModalMenu;
