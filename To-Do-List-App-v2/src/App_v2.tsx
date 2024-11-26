import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid2 from '@mui/material/Grid2';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>(() => {
    
    // Load tasks from local storage on initialization
    const savedTasks = localStorage.getItem('tasks');
    
    try {
      return savedTasks ? JSON.parse(savedTasks) : [];
    } 
    catch (error) {
      console.error("Failed to parse tasks from local storage:", error);
      return [];
    }

  });

  const [newTask, setNewTask] = useState('');

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  

  const handleAddTask = () => {
    
     // Prevent adding empty tasks
    if (newTask.trim() === "")
    {            
      alert("Task title cannot be empty.");
      return;
    } 

    // Prevent adding a task with the same title as an existing task
    if (tasks.some(task => task.title === newTask.trim())) {
      alert("A task with this title already exists.");
      return;
    }

    const task: Task = {
      id: Date.now(),         // Use a timestamp for unique IDs
      title: newTask.trim(),
      completed: false
    };

    setTasks([...tasks, task]);   // Add the new task to the list
    setNewTask('');               // Clear input after adding
  };
  
  const handleRemoveTask = (taskToRemove: Task) => {
    if (!tasks.some((task) => task.id === taskToRemove.id)) {
      console.warn(`Task with id ${taskToRemove.id} not found.`);
      return;
    }
    
    setTasks(tasks.filter((task) => task.id !== taskToRemove.id));
  }; 

  const handleToggleCompleted = (taskToToggle: Task) => {
    setTasks(tasks.map((task) => 
      task.id === taskToToggle.id ? {...task, completed: !task.completed} : task
    ));
  }; 

  return (
    <Box 
        sx={{p: 8}}
    >
        {/* Create the main Grid for all the items: Text input, 'Add Task' Button, etc. */}
        <Grid2 container spacing={2} justifyContent="center">    
            
           {/* Create Main Header*/}
            <Grid2 size={{xs: 12}} display="flex" justifyContent="center">
                
                {/* Create Main Header */}
                <Typography variant="h4" component="h1">
                    To-Do List App
                </Typography>

            </Grid2>

            {/* Create Text input */}
            <Grid2 size={{xs: "auto"}}>
                    <TextField
                    label="New Task"
                    variant="outlined"
                    fullWidth
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter a new task"  
                    />     
                </Grid2>

            {/* Create 'Add Task' Button */}
            <Grid2 size={{xs: "auto"}}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleAddTask}
                    fullWidth
                    sx={{
                    fontSize: '1.25rem', // Increases the font size
                    fontWeight: 'bold',  // Optional: Makes the text bold
                    }}
                >
                    Add Task
                </Button>
            </Grid2>
                
                {/* Create Tasks List */}
                <Grid2 size={{xs: "auto"}}>
                    <List sx={{ width: '100%', maxWidth: '400px' }}> 
                       
                       {/* Create message for empty tasks list situation*/}
                       {tasks.length === 0 ? (
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'black',
                                fontStyle: 'italic',
                                textAlign: 'center',
                                backgroundColor: '#a4625e',
                                width: '100%',
                                padding: 2,
                                borderRadius: 2,
                                border: '1px solid lightgray',
                            }}
                        >
                            No tasks yet. Add some!
                        </Typography>
                        ) : (
                        tasks.map((task: Task) => (
                        <ListItem
                            key={task.id}
                            sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'left',
                            }}
                        >
                            {/* Checkbox and Task Title */}
                            <Checkbox
                            checked={task.completed}
                            onChange={() => handleToggleCompleted(task)}
                            sx={{ marginRight: 1 }}   // Spacing between checkbox and text
                            />
                            <ListItemText
                                primary={task.title}
                                primaryTypographyProps={{
                                    style: {
                                    textDecoration: task.completed ? 'line-through' : 'none'
                                    },
                                }}
                                sx={{
                                    flex: 1,     // Allows the text to take up space without affecting the delete button
                                }}
                            />
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleRemoveTask(task)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))
                )}

                    </List>
                </Grid2>

        </Grid2>

    </Box>
  );
}

export default App;
