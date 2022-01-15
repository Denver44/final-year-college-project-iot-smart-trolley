import React, { useEffect } from 'react';
import './dashboard.css';
import Checkout from '../checkout/Checkout';
import Header from '../Header/Header';
import { useDispatch } from 'react-redux';
function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <div>
      <Header />
      <Checkout />
    </div>
  );
}

export default Dashboard;
