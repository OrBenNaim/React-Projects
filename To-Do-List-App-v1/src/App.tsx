import { useState } from 'react'
import './styles.css';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}


function App(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === "") return;  // Prevent adding empty tasks

    const task: Task = {
      id: (tasks.length > 0) ? tasks.length + 1 : 1,
      title: newTask.trim(),
      completed: false
    };

    setTasks([...tasks, task]);   // Add the new task to the list
    setNewTask('');               // Clear input after adding
  };
  
  const handleRemoveTask = (taskToRemove: Task) => {
    setTasks(tasks.filter((task) => task.id !== taskToRemove.id));
  }; 

  const handleToggleCompleted = (taskToToggle: Task) => {
    setTasks(tasks.map((task) => 
      task.id === taskToToggle.id ? {...task, completed: !task.completed} : task
    ));
  }; 

  return (
    <div>
      <h1>To-Do List App</h1>
      <input 
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder='Enter new task'
        aria-label="New task input"
      />
      <button onClick={handleAddTask} aria-label="Add new task">Add Task</button>
      <ul>
        {tasks.length === 0 && <p>No tasks yet. Add some!</p>}
        {tasks.map((task: Task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input 
              type='checkbox'
              checked={task.completed}
              onChange={() => handleToggleCompleted(task)}
            />
            <span>{task.title}</span>
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
