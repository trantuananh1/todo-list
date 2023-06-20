import React, { memo, useState } from "react";

const TodoItem = (props) => {
    const {
        todo,
        markCompleted,
        getEditTodo,
        todoEditingId,
        editTodo,
        index,
        removeTodo
    } = props
    const isEditing  = todoEditingId === todo.id;
    const [text, setText] = useState(todo.text)
    const onEditTodo = () => {
        editTodo({
            ...todo,
            text
        }, index)
        getEditTodo('')
    }
    const { isCompleted, id } = todo;

    const onDoubleClickLabel = () => {
        getEditTodo(todo.id)
    }

    return (
        <li className={`${isEditing ? 'editing' : ''} ${isCompleted ? 'completed' : ''}`}>
            {
                !isEditing? 
                    <div className="view">
                        <input
                            className="toggle"
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => markCompleted(id)}
                        />
                        <label onDoubleClick={onDoubleClickLabel}>{text}</label>
                        <button 
                            className="destroy" 
                            onClick={() => removeTodo(id)}
                        />
                    </div> :
                    <input
                        className="edit"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onBlur={onEditTodo}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && text) {
                                onEditTodo()
                            }
                        }}
                    />
            }
        </li>
    )
}

export default memo(TodoItem);