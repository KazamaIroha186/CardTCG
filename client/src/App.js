import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">Home Page</Link>
          <Link to="/login">Login</Link>
        </div>
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
 