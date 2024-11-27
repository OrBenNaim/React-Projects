import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ToDoListApp from './components/ToDoListApp';

function App() {
  const [userName, setUserName] = useState<string | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setUserName={setUserName} />} />
        <Route path="/app" element={<ToDoListApp userName={userName} />} />
      </Routes>
    </Router>
  );
}

export default App;
