import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <>
      <div className="navigation-buttons">
        <Link to='/scrapper'><button class="button-1">Go to Scraper</button></Link>
        <Link to='/history'><button class="button-1">History</button></Link>
      </div>
    </>
  );
}