import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';
import "./index.css";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    console.log(storedTodos)
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  

  function handleClick() {
    let storedBlogs = JSON.parse(localStorage.getItem('todoApp.todos'));
    storedBlogs.reverse()
    localStorage.setItem('todoApp.todos', JSON.stringify(storedBlogs));
    window.location.reload(true)
  }

  return (
    <>
    <div className='todo-app'>
      <h1>Lista Todo</h1>
      <h2>Dodaj kolejne elementy</h2>
      <div className='container'>
        <input className='todo-input' ref={todoNameRef} type="text" />
        <button className='todo-button' onClick={handleAddTodo}>Dodaj</button>
        <h2>{todos.filter(todo => !todo.complete).length} jeszcze do zrobienia</h2>
        <div className='list'><TodoList todos={todos} toggleTodo={toggleTodo} /></div>
        <button className='todo-button1' onClick={handleClick}>Zmień kolejność</button>
        <button className='todo-button2' onClick={handleClearTodos}>Wyczyść zrobione</button>
      </div>
    </div>
    </>
  )

}

export default App;
