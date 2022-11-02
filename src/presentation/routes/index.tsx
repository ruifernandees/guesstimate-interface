import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Home from '../pages/Home';

const AppRoutes: React.FC = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
);

export default AppRoutes;
