import React, { memo, useState } from "react";
import { message } from 'antd';

const Header = (props) => {
    const {addTodo, checkAll, isCheckedAll} = props
    const [text, setText] = useState('')

    const onAddTodo = (event) => {
        const value = text.trim();
        if (value && event.key === 'Enter') {
            addTodo({
                id: new Date().valueOf(),
                text: value,
                isCompleted: false
            })
            setText('')
        } else if(!value && event.key === 'Enter') {
            message.open({
                type: 'error',
                content: 'Dữ liệu chưa đúng vui lòng kiểm tra lại!.',
            });
            setText('')
        }
    }

    const onChangeInput = (e) => {
        const { value } = e.target;
        setText(value);
    };
    
    return (
        <header className="header">
            <h1>todos</h1>
            <div className="header-wrap-content-left">
                <input
                    className="toggle-all"
                    type="checkbox"
                    onChange={() => {
                        checkAll()
                    }}
                    checked={isCheckedAll}
                />
                <label htmlFor="toggle-all" onClick={checkAll} />
            </div>
            <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={text}
            onChange={onChangeInput}
            onKeyPress={onAddTodo}
            />
            
        </header>
    )    
}
export default memo(Header)