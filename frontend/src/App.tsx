import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './redux/store.ts';
import HomePage from './pages/HomePage.tsx';
import ProductDetailsPage from './pages/ProductDetailsPage.tsx';
import CartPage from './pages/CartPage.tsx';
// import AdminDashboardPage from './pages/AdminDashboardPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* <Route path="/admin" element={<AdminDashboardPage />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
