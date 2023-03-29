import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../features/todos/todosSlice';

export default function Todo(props) {
  const { todo } = props;
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);

  const saveTodo = () => {
    const payload = {
      id: todo.id,
      text: editValue,
    };
    dispatch(updateTodo(payload));
    cancelEdit();
  };

  const cancelEdit = () => {
    setIsEdit(false);
  };

  return isEdit ? (
    <form onSubmit={saveTodo}>
      <input
        type='text'
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
      />
      <button type='submit' style={{ marginLeft: '.5rem' }} >Save</button>
      <button onClick={cancelEdit} style={{ marginLeft: '.5rem' }}  >Cancel</button>
    </form>
  ) : (
    <>
      <span>{todo.text}</span>
      <button style={{ marginLeft: '.5rem' }} onClick={() => setIsEdit(!isEdit)}>Edit</button>
      <button style={{ marginLeft: '.5rem' }} onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
    </>
  );
}
