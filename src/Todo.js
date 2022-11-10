import { Button } from 'bootstrap';
import React from 'react'


export default function Todo({ todo, toggleTodo, indexTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }

  function handleUp() {
    if (indexTodo == 0) {
      return
    }
    
    let storedBlogs = JSON.parse(localStorage.getItem('todoApp.todos'));
    var x = indexTodo;
    var pos = indexTodo - 1;
    var temp = storedBlogs[x];
    var i;
    for (i = x; i >= pos; i--)
        {
            storedBlogs[i] = storedBlogs[i - 1];
        }
    storedBlogs[pos] = temp;
    localStorage.setItem('todoApp.todos', JSON.stringify(storedBlogs));
    console.log(storedBlogs)
    window.location.reload(true)
  }

  function handleDown() {
    let storedBlogs = JSON.parse(localStorage.getItem('todoApp.todos'));

    if (indexTodo == storedBlogs.length - 1) {
      return
    }

    var prevIdx = indexTodo;
    var nextIdx = indexTodo + 1;
    var prev = storedBlogs[prevIdx];
    var next = storedBlogs[nextIdx];

    storedBlogs[prevIdx] = next
    storedBlogs[nextIdx] = prev

    localStorage.setItem('todoApp.todos', JSON.stringify(storedBlogs));
    console.log(storedBlogs)
    window.location.reload(true)
  }

  return (
    <div className='calosc'>
      <div className='punkty'>
        <label >
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
            {todo.name} {indexTodo}
        </label>
      </div>
      <div className='punkty-prawo'>
        <span><button className='strzalka' onClick={handleUp}>↑</button></span>
        <span><button className='strzalka' onClick={handleDown}>↓</button></span>
      </div>
    </div>
  )
}
