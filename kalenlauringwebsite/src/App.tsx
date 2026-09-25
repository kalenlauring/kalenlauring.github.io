import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="/portfolio" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
