import logo from './logo.svg';
import { useEffect, useState } from 'react'
import './App.css';
import BackgroundVideo from './components/Backgroundvideo';
import WebtrekLogo from './assets/webtrek-logo.png';
import Navigation from './components/Navigation'
import { Link } from 'react-router-dom';
import Search from './components/Search';


export default function App() {
  const [data, setData] = useState([{}])


  // Testing API
  useEffect(() => {
    fetch('/members')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <>
      <BackgroundVideo />
      <div className="button-1-container">
        <Navigation />
      </div>
      <div className="flex-container">
        <Search />
      </div>
    </>
  );
}