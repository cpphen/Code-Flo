var React = require('react');
import Todo from './Todo.jsx';

var TodoList = React.createClass({
  render: function () {
    var {todos} = this.props;
    var renderTodos = () => {
      return todos.map((todo, i) => {
        return (
          <Todo key={i} {...todo} onToggle={this.props.onToggle}/>
        );
      });
    };

    return (
      <div>
        {renderTodos()}
      </div>
    )
  }
});

module.exports = TodoList;
