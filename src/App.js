import React, { useState } from "react";
import "./styles.css";

const App = () => {
  const [todos, setTodos] = useState([
    {
      text: "learn React",
      isComplete: true
    },
    {
      text: "Trying something new",
      isComplete: false
    },
    {
      text: "Hooks are amazing!",
      isComplete: false
    }
  ]);

  const Todo = ({ todo, index, completeTodo, deleteTodo }) => (
    <div
      style={{ textDecoration: todo.isComplete ? "line-through" : "" }}
      className="todo">
      {todo.text}
      <div className="buttons">
        <button className="completed" onClick={() => completeTodo(index)}>
          ✓
        </button>
        <button className="delete" onClick={() => deleteTodo(index)}>
          X
        </button>
      </div>
    </div>
  );

  const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue("");
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New Todo..."
          className="input"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    );
  };

  const addTodo = text => {
    setTodos([...todos, { text }]);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isComplete = true;
    setTodos(newTodos);
    newTodos[index].text.substr(-1) !== "✓"
      ? (newTodos[index].text += "✓")
      : alert("Already done!");
  };

  const deleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        ))}

        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
};

export default App;
