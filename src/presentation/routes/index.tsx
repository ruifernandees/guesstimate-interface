import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import About from '../pages/About';
import Home from '../pages/Home';
import { Inference } from '../pages/Inference';

const AppRoutes: React.FC = () => (
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/inference" element={<Inference />} />
      </Routes>
    </BrowserRouter>
  </AppProvider>
);

export default AppRoutes;
