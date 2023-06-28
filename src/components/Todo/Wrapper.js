import React, { memo, useState, useRef, useEffect } from "react";

// Component
import TodoItem from "./Item";

const TodoWrapper = (props) => {
    const {listTodos} = props
    const refs = useRef(null);

    useEffect(() => {
        const listElement = refs.current;
        console.log('listElement =========>', listElement);
        listElement.addEventListener("scroll", handleScroll);
        return () => {
            listElement.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const listElement = refs.current;
        const scrollTop = listElement.scrollTop;
        const clientHeight = listElement.clientHeight;
        const scrollHeight = listElement.scrollHeight;

        console.log('scrollTop ===========>', scrollTop);
        console.log('clientHeight =============>', clientHeight);
        console.log('scrollHeight ==========>', scrollHeight);
    
        if (scrollTop + clientHeight >= (scrollHeight - 10)) {
            console.log("Scroll Get list data");
        }
      };

    
    return (
        <div className="main" ref={refs}>          
            <ul className="todo-list">
                {
                    listTodos.map((todo, index) => 
                    <TodoItem
                        key={todo.id} 
                        index={index} 
                        todo={todo} 
                        {...props}
                    />)
                }
            </ul>
        </div>
    )
}

export default memo(TodoWrapper)