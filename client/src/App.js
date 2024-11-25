import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import HomepageUA from './components/HomepageUnAuth';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgetPassword from './components/Forgetpass';
import DeckBuild from './components/DeckBuild';
import NewDeck from './components/NewDeck';
import Cards from './components/Cards';
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/homepage" element={<HomepageUA />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetpass" element={<ForgetPassword />} />
          <Route path="/deckbuild" element={<DeckBuild />} />
          <Route path="/newdeck" element={<NewDeck/>} />
          <Route path="/cards" element={<Cards/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
 