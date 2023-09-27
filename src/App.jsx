import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MemberPurchase from './pages/membership_purchase/MemberPurchase';
import Success from './pages/membership_purchase/Success';
import Failed from './pages/membership_purchase/Failed';

function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
