import { Component } from 'react';

// Compoent
import Todo from "./components/Todo"

export default class App extends Component{
  render () {
    return (
      <div className='todoapp'>
        <Todo />
      </div>
    );
  }
}

