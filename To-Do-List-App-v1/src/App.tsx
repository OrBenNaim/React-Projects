import React, { useState } from 'react'


interface Task {
  id: number;
  title: string;
  completed: boolean;
}


function App(): JSX.Element {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === "") return;  // Prevent adding empty tasks

    const task: Task = {
      id: tasks.length,
      title: newTask,
      completed: false
    };

    setTasks([...tasks, task]); // Add the new task to the list
    setNewTask(''); // Clear input after adding
  };
  
  const handleRemoveTask = (task: Task) => {

  }; 

  const handleToggleCompleted = (task: Task) => {

  }; 

  return (
    <div>
      <h1>To-Do List</h1>
      <input 
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder='Enter new task'
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task: Task) => (
          <li key={task.id}>
            <input 
              type='checkbox'
              checked={task.completed}
              onChange={() => handleToggleCompleted(task)}
            />
            <span
              style={{
                textDecoration: task.completed? 'line-through' : 'none',
              }}
            >
              {task.title}
            </span>
            <button onClick={() => handleRemoveTask(task)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total tasks: {tasks.length}</p>
      <p>Completed tasks: {tasks.filter((task: Task) => task.completed).length}</p>
    </div>
  );
}

export default App
