import React from 'react';
import { ToastContainer } from 'react-toastify';

import './global.css'
import AppRoutes from './presentation/routes';

function App() {

  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  );
}

export default App;
