import React from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm';

export default function TodoList({ todos, toggleTodo }) {
  return (
    todos.map((todo, index) => {
        return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} indexTodo={index}/>
    })
  )
}
