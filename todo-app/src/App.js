import React, {useReducer, useState, useRef, useCallback} from 'react';
import { toIdentifier } from '../../../../../Library/Caches/typescript/4.3/node_modules/@babel/types/lib/index';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos() {
  const array = [];
  for(let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter(todo => toIdentifier.id !== action.id)
    case 'TOGGLE':
      return todos.map(todo => todo.id === action.id ? {...todo, checked: !todo.checked}: todo,);
    default:
      return todos;
  }
}

const App = () => {
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: "리액트의 기초 알아보기",
  //     checked: true,
  //   }, {
  //     id: 2,
  //     text: "컴포넌트 스타일링 해보기",
  //     checked: true,
  //   }, {
  //     id: 3,
  //     text: "일정 관리 앱 만들어 보기",
  //     checked: false,
  //   },
  // ]);
  // const nextId = useRef(4);

  // const[todos, setTodos] = useState(createBulkTodos);

  // const nextId = useRef(2501);


  // const onInsert = useCallback(
  //   text => {
  //     const todo = {
  //       id: nextId.current,
  //       text,
  //       checked: false,
  //     };
  //     setTodos(todos => todos.concat(todo));
  //     nextId.current += 1;
  //   }, [],
  // );

  // const onRemove = useCallback(
  //   id => {
  //     setTodos(todos => todos.filter(todo => todo.id !== id));
  //   },
  //   [],
  // );

  // const onToggle = useCallback(
  //   id => {
  //     setTodos(todos =>
  //       todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo,
  //         ),
  //     );
  //   },
  //   [],
  // )

  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const nextId = useRef(2501);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      chekced: false,
    };
    dispatch({type: 'INSERT', todo});
    nextId.current += 1;
  }, []);

  const onRemove = useCallback(id => {
    dispatch({type: 'REMOVE', id});
  }, []);

  const onToggle = useCallback(id => {
    dispatch({type: 'TOGGLE', id});
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;