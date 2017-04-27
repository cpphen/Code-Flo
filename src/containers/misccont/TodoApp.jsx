import React, {Component} from 'react';
// var uuid = require('node-uuid');
// var moment = require('moment');
import axios from 'axios';

import TodoList from '../components/TodoList.jsx'
import AddTodo from '../components/AddTodo.jsx';
import TodoSearch from '../components/TodoSearch.jsx';
import Todo from '../components/Todo.jsx';
import TodoAPI from '../components/TodoAPI.jsx';


class TodoApp extends Component{
 // getInitialState: function () {
 //   return {
 //     showCompleted: false,
 //     searchText: '',
 //     todos: TodoAPI.getTodos()
 //   };
 // },
 constructor(props){
   super(props)

   this.state = {
     todos: []
   }
   this.handleAddTodo = this.handleAddTodo.bind(this);
   this.handleSearch = this.handleSearch.bind(this);
 }
 componentDidUpdate() {
   console.log("TODOAPP log state.todos", this.state.todos);
   this.props.setTodos(this.state.todos);
 }
 handleAddTodo(text) {

    this.setState(previousState => ({
      todos: [...previousState.todos, text]
    }))





  //  axios.post('/api/todo', text).then(response=>response.json()).then(json=>console.log(json))
 }
 // handleToggle: function (id) {
 //   var updatedTodos = this.state.todos.map((todo) => {
 //     if (todo.id === id) {
 //       todo.completed = !todo.completed;
 //       todo.completedAt = todo.completed ? moment().unix() : undefined;
 //     }
 //
 //     return todo;
 //   });
 //
 //   this.setState({todos: updatedTodos});
 // },
 handleSearch(showCompleted, searchText) {
   this.setState({
     showCompleted: showCompleted,
     searchText: searchText.toLowerCase()
   });
 }
 render() {
   var {todos, showCompleted, searchText} = this.state;
  //  var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

   return (
     <div>
       <TodoSearch onSearch={this.handleSearch}/>
       <TodoList todos={this.state.todos}/>
       {/* <TodoList todos={filteredTodos} onToggle={this.handleToggle}/> */}
       <AddTodo onAddTodo={this.handleAddTodo}/>
     </div>
   )
 }
};

export default TodoApp;
