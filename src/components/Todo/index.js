import { Component } from 'react';

// Component
import Header from './Header';
import TodoWrapper from './Wrapper';
import Footer from './Footer';
import { Status } from './useTodo';

import './css/style.css'



export default class App extends Component {
  state = {
    listTodos: [],
    isCheckedAll: false,
    status: Status.ALL,
    todoEditingId: ''
  }


  addTodos = (todo = {}) => {
    this.setState(preState => ({
      listTodos: [...preState.listTodos, todo]
    }))
  }

  markCompleted = (id = '') => {
    debugger;
    const { listTodos } = this.state
    let isCheckedAll = true
    const updatedListTodos = listTodos.map(item => {
      if ((!item.isCompleted && item.id !== id) || (item.isCompleted && item.id === id)) {
        isCheckedAll = false
      }
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted }
      }
      return item
    })
    this.setState({
      isCheckedAll,
      listTodos: updatedListTodos
    })
  }

  checkAll = () => {
    const { listTodos, isCheckedAll } = this.state
    const updatedListTodos = listTodos.map(item => ({ ...item, isCompleted: !isCheckedAll }))
    this.setState(preState => ({
      isCheckedAll: !preState.isCheckedAll,
      listTodos: updatedListTodos
    }))
  }

  clearCompleted = () => {
    this.setState(preState => ({
      listTodos: this.filterTodosLeft(preState.listTodos)
    }))
  }

  getEditTodo = (id = '') => {
    this.setState({
      todoEditingId: id
    })
  }

  editTodo = (todo, index) => {
    const { listTodos } = this.state
    listTodos.splice(index, 1, todo)
    this.setState({ listTodos })
  }

  removeTodo = (id = '') => {
    this.setState(prevState => ({
      listTodos: this.filterByStatus(prevState.listTodos, 'REMOVE', id)
    }))
  }

  // check status 
  filterByStatus = (listTodos = [], status = '', id) => {
    switch (status) {
      case Status.ACTIVE:
        return listTodos.filter(item => !item.isCompleted)
      case Status.COMPLETED:
        return listTodos.filter(item => item.isCompleted)
      case 'REMOVE':
        return listTodos.filter(item => item.id !== id)
      default:
        return listTodos
    }
  }

  // update status
  filterTodosLeft = (listTodos = []) => {
    return listTodos.filter(item => !item.isCompleted)
  }

  render() {
    const { listTodos, isCheckedAll, status, todoEditingId } = this.state
    return (
      <div className='todoapp'>
        <Header
          addTodo={this.addTodos}
        />
        <TodoWrapper
          listTodos={this.filterByStatus(listTodos, status)}
          markCompleted={this.markCompleted}
          checkAll={this.checkAll}
          isCheckedAll={isCheckedAll}
          todoEditingId={todoEditingId}
          getEditTodo={this.getEditTodo}
          editTodo={this.editTodo}
          removeTodo={this.removeTodo}
        />
        <Footer 
          activeButton={status}
          setStatusFilter={(status) => this.setState({ status })}
          clearCompleted={this.clearCompleted}
          numOfTodosLeft={this.filterTodosLeft(listTodos).length}
          numOfTodos={listTodos.length}
        />
      </div>
    );
  }
}

