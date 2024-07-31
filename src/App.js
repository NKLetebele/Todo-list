import React, { useState, useEffect } from 'react';
import './App.css';
import todosData from './todos.json';

function App() {
  const [todos, setTodos] = useState(todosData);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task) => {
    const newTodo = { id: Math.random(), task, completed: false };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodoCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    addTodo(inputValue);
    setInputValue('');
  };

  return (
    <div className="container mx-auto flex justify-center items-center p-4">
      <div className="w-10/12 max-md:w-full">
      <div style={{ display: 'flex' }}>
          <h1 style={{ fontSize: '70px' }}>Todo List</h1>
          <img
            width="94"
            height="94"
            src="https://img.icons8.com/3d-fluency/94/test-passed.png"
            alt="test-passed"
          />
        </div>
        <form className="js-todo-form w-full flex justify-between my-8" onSubmit={handleFormSubmit}>
          <input
            className="js-todo-input grow border border-gray-300 px-4 py-4 rounded-md"
            placeholder="Add a new task"
            type="text"
            aria-label="Add a new task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="js-todo-add-button bg-black text-white px-4 py-2 rounded-md ml-2"
            type="submit"
            aria-label="Add task"
          >
            Add task
          </button>
        </form>
        <ul className="js-todo-list">
          {todos.sort((a, b) => a.completed - b.completed).map((todo) => (
            <li
              key={todo.id}
              className="border-b py-4 flex items-center justify-between"
            >
              <span
                className={`text-2xl max-md:text-xl font-normal text-gray-800 ${todo.completed ? 'line-through' : ''}`}
              >
                {todo.task}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  className={`p-4 cursor-pointer border rounded-full ${todo.completed ? 'bg-black' : 'bg-white'}`}
                  aria-label="Complete"
                  title="Complete"
                  onClick={() => toggleTodoCompleted(todo.id)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 16" fill="none">
                    <path
                      d="M1 7l8 8L23 1"
                      stroke={todo.completed ? '#fff' : '#000'}
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <button
                  className="p-4 ml-auto cursor-pointer border rounded-full"
                  aria-label="Delete"
                  title="Delete"
                  onClick={() => deleteTodo(todo.id)}
                  style={{ backgroundColor: '#fbd9d8', borderColor: '#fc4c4e' }} // Fixed style properties
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M1 17L17 1M17 17L1 1"
                      stroke="#fc4c4e" // Set the stroke color to red
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
