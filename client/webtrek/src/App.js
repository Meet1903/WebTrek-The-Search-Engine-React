import logo from './logo.svg';
import { useEffect, useState } from 'react'
import './App.css';
import BackgroundVideo from './components/Backgroundvideo';
import WebtrekLogo from './assets/webtrek-logo.png';
import Navigation from './components/Navigation'
import { Link } from 'react-router-dom';


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
          <div className="header">
              <h1>
                  <Link to='/'><img src={WebtrekLogo} alt="" className="webtrek-logo" /></Link>
              </h1>
          </div>
          <div className="search-box">
              <form action="/search" method="POST">
                  <input type="text" name="query" className="search-bar" placeholder="Search WebTrek" required />
                  <input type="submit" value="Search" className="search-button" /> 
              </form>
          </div>
      </div>
    </>
  );
}