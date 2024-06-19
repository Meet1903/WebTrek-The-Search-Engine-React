import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Scrapper from './Scrapper';
import History from './History';

export default function Nevigation() { 
    return (
    <Router>
      <div>
        <nav>
          <Link to="/scrapper">
            <button className="button-1">Go to Scraper</button>
          </Link>
          <Link to="/history">
            <button className="button-1">History</button>
          </Link>
        </nav>
        <Routes>
          <Route path="/scrapper" element={<Scrapper />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}