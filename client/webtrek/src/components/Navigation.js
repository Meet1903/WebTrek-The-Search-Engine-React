import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Scrapper from './Scrapper';
import History from './History';

export default function Navigation() { 
    return (
    <>
     <div className="navigation-buttons">
        <button class="button-1">Go to Scraper</button>
        <Link to='/history'><button class="button-1">History</button></Link>
    </div>
    </>
  );
}