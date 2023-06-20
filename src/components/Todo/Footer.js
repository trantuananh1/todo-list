import React, { memo } from "react";
import { Status } from "./useTodo";

const Footer = (props) => {
    const {
        setStatusFilter,
        activeButton,
        clearCompleted,
        numOfTodosLeft,
        numOfTodos
    } = props
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{numOfTodosLeft}</strong>
                <span> </span>
                <span>{numOfTodosLeft > 1 ? 'items' : 'item'}</span>
                <span> left</span>
            </span>
            <ul className="filters">
                <li>
                    <a
                        href="#/"
                        className={`${activeButton === Status.ALL ? "selected" : ''}`}
                        onClick={() => setStatusFilter(Status.ALL)}
                    >
                        All
                    </a>
                </li>
                <span></span>
                <li>
                    <a
                        href="#/active"
                        className={`${activeButton === Status.ACTIVE ? "selected" : ''}`}
                        onClick={() => setStatusFilter(Status.ACTIVE)}
                    >
                        Active
                    </a>
                </li>
                <span></span>
                <li>
                    <a
                        href="#/completed"
                        className={`${activeButton === Status.COMPLETED ? "selected" : ''}`}
                        onClick={() => setStatusFilter(Status.COMPLETED)}
                    >
                        Completed
                    </a>
                </li>
            </ul>
            {
                numOfTodosLeft < numOfTodos && <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
            }
        </footer>
    )
}

export default memo(Footer)