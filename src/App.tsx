import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MainPage from './components/MainPage';
import ProductDetail from './components/ProductDetail';
import CartPage from './pages/CartPage';
import { useSelector } from 'react-redux';
import { RootState }   from './store/store';
import LoginPage       from './components/Login';
import './styles/App.css';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {  
      main: '#dc004e',
    },
  },
});

const AppContent = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="app">
      <header className="app-header">
        <nav>
          <div className="nav-links-left">
            <Link to="/" className="nav-link">홈</Link>
            <Link to="/login" className="nav-link">로그인</Link>
          </div>
          <Link to="/cart" className="nav-link cart-link">
            장바구니
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </Link>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>© 2024 쇼핑몰. All rights reserved.</p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
