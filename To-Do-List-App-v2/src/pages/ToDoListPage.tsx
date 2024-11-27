import { Typography, Box, Card, CardContent} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import App from './App1';    // Import your To-Do List logic

function ToDoListApp({ userName }: { userName: string | null }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#e3f2fd',
        padding: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          maxWidth: 800,
          width: '100%',
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Grid2 container spacing={4}>
            {/* Welcome Message */}
            <Grid2 size={{xs: 12}}>
              <Typography
                variant="h5"
                align="center"
                sx={{ fontWeight: 'bold', color: '#1976d2' }}
              >
                Hello, {userName || 'Guest'}! Let's manage your tasks.
              </Typography>
            </Grid2>

            {/* To-Do List */}
            <Grid2 size={{xs: 12}}>
              <App />
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ToDoListApp;
