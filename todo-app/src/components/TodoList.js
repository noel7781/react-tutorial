import React, {useCallback} from 'react';
import {List} from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({todos, onRemove, onToggle}) => {
    const rowRenderer = useCallback(
        ({index, key, style}) => {
            const todo = todos[index];
            return (
                <TodoListItem
                    todo={todo}
                    key={key}
                    onRemove={onRemove}
                    onToggle={onToggle}
                    style={style}
                />
            );
        }, [onRemove, onToggle, todos],
    );
    return (
        <List
            className="TodoList"
            width={497}
            height={720}
            rowCount={todos.length}
            rowHeight={80}
            rowRenderer={rowRenderer}
            list={todos}
            style={{outline: 'none'}}
        />
    );
};

export default React.memo(TodoList);