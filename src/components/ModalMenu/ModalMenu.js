import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './ModalMenu.module.css';
import ModalDelete from '../ModalDelete/ModalDelete';
import ModalEdit from '../ModalEdit/ModalEdit';

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
                    src='https://img.icons8.com/material-rounded/96/000000/hearts.png'
                    alt='Favorite'
                  />
                </button>
              ) : (
                <button className={styles.btn} onClick={handleFavourite}>
                  <img
                    className={styles.icon}
                    src='https://img.icons8.com/material-outlined/96/000000/hearts.png'
                    alt='Favorite'
                  />
                </button>
              )}
              {completed ? (
                <button className={styles.btn} onClick={handleComplete}>
                  <img
                    className={styles.icon}
                    src='https://img.icons8.com/material-rounded/96/000000/return.png'
                    alt='Return'
                  />
                </button>
              ) : (
                <button className={styles.btn} onClick={handleComplete}>
                  <img
                    className={styles.icon}
                    src='https://img.icons8.com/material-rounded/96/000000/checkmark--v1.png'
                    alt='Done'
                  />
                </button>
              )}
              <button className={styles.btn} onClick={() => ToggleModalEdit()}>
                <img
                  className={styles.icon}
                  src='https://img.icons8.com/small/96/000000/edit.png'
                  alt='Edit'
                />
              </button>
              <button
                className={styles.btn}
                onClick={() => ToggleModalDelete()}
              >
                <img
                  className={styles.icon}
                  src='https://img.icons8.com/fluency-systems-regular/96/000000/minus.png'
                  alt='Delete'
                />
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
