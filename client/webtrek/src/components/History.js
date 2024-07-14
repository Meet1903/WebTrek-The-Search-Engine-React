import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WebTrekLogoFont from '../assets/webtrek-font.png'
import BackgroundImage from '../assets/background-image.png'
import axios from 'axios';

export default function History(props = null) {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [prevPage, setPrevPage] = useState(false);

  const fetchHistory = async (page) => {
    try {
      const response = await axios.get(`/history?page=${page}`);
      const data = response.data;
      setHistory(data.history);
      setCurrentPage(data.current_page);
      setNextPage(data.next_page);
      setPrevPage(data.prev_page);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const deleteHistory = async () => {
    try {
      console.log("Deleting history");
      await axios.post(`/history`);
      await fetchHistory(currentPage+1);
    } catch (error) {
      console.error("Error in deleting history:", error);
    }
  };
  
  useEffect(() => {
    fetchHistory(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (prevPage && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDeleteClick = (event) => {
    event.preventDefault(); // Prevent the default form submission
    deleteHistory();
  };

  return (
    <div className="full-page-component">
      <div className="background-image">
        <img src={BackgroundImage} alt="" srcset="" />
      </div>
      <div className="header">
        <h1>
          <Link to='/'><img src={WebTrekLogoFont} alt="" srcset="" className="webtrek-font" /></Link>
        </h1>
      </div>
      <div className="button-2-container">
        <Link to='/'><button className="button-2">Back to Search Engine</button></Link>
        <form method="post">
          <button type="submit" className="button-2" onClick={handleDeleteClick}>Clean History</button>
        </form>
      </div>
      <div className="query-history">
        <h2 className="history-title">Query History</h2>
        {history.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Query</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr key={index}>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <div className="button-2-container" style={{ marginTop: '20px' }}>
                {prevPage && <button onClick={handlePrevPage} className="button-2">Previous</button>}
                {nextPage && <button onClick={handleNextPage} className="button-2">Next</button>}
              </div>
            </div>
          </>
        ) : (
          <p style={{ textAlign: '-webkit-center' }}>No query history available.</p>
        )}
      </div>
    </div>
  )
}