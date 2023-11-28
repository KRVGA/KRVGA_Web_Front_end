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
import Footer from './components/Footer';
import Reset from './components/Reset';
import ChangePwd from './pages/ChangePwd';
import {ContextProvider} from './context/Context';
import MembershipItem from './components/MembershipItem';
import Calendar from './pages/Calendar';

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
              path='/calendar'
              element={<Calendar />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/reset'
              element={<Reset />}
            />
            <Route
              path='/change_password/:tokenString'
              element={<ChangePwd />}
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

            <Route
              path='/details/:membershipId'
              element={<PrivateRoute />}
            >
              <Route
                path='/details/:membershipId'
                element={<MembershipItem />}
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
