import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useState} from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import MemberPurchase from './pages/membership_purchase/MemberPurchase';
import Success from './pages/membership_purchase/Success';
import Failed from './pages/membership_purchase/Failed';
import Profile from './pages/Profile';

import {ContextProvider} from './context/Context';
import Footer from './components/Footer';

function App() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const handleClick = () => {
    if (isHamburgerOpen) {
      setIsHamburgerOpen(false);
    }
  };

  return (
    <ContextProvider>
      <Router>
        <main
          className='flex flex-col h-screen'
          onClick={handleClick}
        >
          <NavBar
            isHamburgerOpen={isHamburgerOpen}
            setIsHamburgerOpen={setIsHamburgerOpen}
          />
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/register'
              element={<Register />}
            />
            <Route
              path='/membership_purchase'
              element={<MemberPurchase />}
            />
            <Route
              path='/success_purchase'
              element={<Success />}
            />
            <Route
              path='/failed_purchase'
              element={<Failed />}
            />
            <Route
              path='profile'
              element={<PrivateRoute />}
            >
              <Route
                path='/profile'
                element={<Profile />}
              />
            </Route>
          </Routes>
          <Footer />
        </main>
      </Router>
    </ContextProvider>
  );
}

export default App;
