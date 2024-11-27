import './App.css';
import { Route, Routes } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import HomepageUA from './components/Homepage/HomepageUnAuth';
import Login from './components/Account/Login';
import Signup from './components/Account/Signup';
import ForgetPassword from './components/Account/Forgetpass';
import MyCollection from './components/Collection/my-collection/MyCollection';
import NewDeck from './components/Collection/decks/NewDeck';
import Cards from './components/Card/Cards';
import NavbarUnauth from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/sidebar';
import loginAtom from './atom-user/user.atom';

function App() {
  const location = useLocation();
  const excludedRoutes = ["/login", "/signup", "/forgetpass"];
  const loginValue = useRecoilValue(loginAtom)


  return (
    
    <div className="App">

        {!excludedRoutes.includes(location.pathname) && <NavbarUnauth />}
        {!excludedRoutes.includes(location.pathname) && <Sidebar />}
        <main className='main-content'>
          <Routes>
            <Route path="/home" element={<HomepageUA />} />
            <Route path="/" element={<HomepageUA />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgetpass" element={<ForgetPassword />} />
            <Route path="/mycollections" element={<MyCollection />} />
            <Route path="/newdeck" element={<NewDeck/>} />
            <Route path="/cards" element={<Cards/>} />
          </Routes>
        </main>
       
    </div>
  );
}

export default App;
 