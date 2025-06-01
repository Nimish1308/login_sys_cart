import logo from './logo.svg';
import './App.css';
import 'mdb-ui-kit/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import Navigation from './pages/Navigation';
import Products from './pages/Products';
import { CartProvider } from './pages/CartContext';




function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <Navigation />
        <ToastContainer autoClose={1000} />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products' element={<Products />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
