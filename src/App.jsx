import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navigation from './pages/Nav/Navigation';
import RegLog from './pages/Auth/RegLog';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/regLog" element={<RegLog />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
