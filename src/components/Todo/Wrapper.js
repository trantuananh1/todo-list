import React, { memo, useState } from "react";

// Component
import TodoItem from "./Item";

const TodoWrapper = (props) => {
    const {listTodos, checkAll, isCheckedAll} = props
    return (
        <section className="main">
            <input
                className="toggle-all"
                type="checkbox"
                onChange={() => {
                    checkAll()
                }}
                checked={isCheckedAll}
            />
            <label htmlFor="toggle-all" onClick={checkAll}></label>
            <ul className="todo-list">
                {
                    listTodos.map((todo, index) => 
                    <TodoItem 
                        index={index} 
                        todo={todo} 
                        {...props}
                    />)
                }
            </ul>
        </section>
    )
}
export default memo(TodoWrapper)