import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import styles from './ModalEdit.module.css';
import { editTodo } from '../../store/todoSlice';

const CHAR_LIMIT = 160;

const ModalEdit = ({ show, close, todo }) => {
  const dispatch = useDispatch();

  const handleEdit = (event) => {
    event.preventDefault();

    const title = event.target.title.value.trim();

    if (title.length === 0) return;

    fetch(`https://62e7b55693938a545bd77018.mockapi.io/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ title: title }),
    }).then(dispatch(editTodo({ id: todo.id, title: title })));

    close();
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
            <form className={styles.form} onSubmit={handleEdit}>
              <input
                className={styles.input}
                type='text'
                name='title'
                defaultValue={todo.title}
                maxLength={CHAR_LIMIT}
              />
              <button className={styles.btn} type='submit'>
                +
              </button>
              <button className={styles.btn} onClick={() => close()}>
                &times;
              </button>
            </form>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal')
  );
};

export default ModalEdit;
