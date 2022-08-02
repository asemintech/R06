import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import styles from './ModalDelete.module.css';
import { deleteTodo } from '../../store/todoSlice';

const ModalDelete = ({ show, close, todo }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    fetch(`https://62e7b55693938a545bd77018.mockapi.io/todos/${todo.id}`, {
      method: 'DELETE',
    }).then(dispatch(deleteTodo({ id: todo.id })));
  };

  return ReactDOM.createPortal(
    <>
      {show && (
        <div
          className={`${styles.modal} ${styles.show}`}
          onClick={() => close()}
        >
          <div
            className={styles.content}
            onClick={(event) => event.stopPropagation()}
          >
            <span>Delete this todo?</span>
            <span className={styles.title}>{todo.title}</span>
            <span className={styles.title}>{todo.createdAt}</span>
            <div className={styles.btns}>
              <button className={styles.btn} onClick={() => close()}>
                Cancel
              </button>
              <button className={styles.delete_btn} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal')
  );
};

export default ModalDelete;
