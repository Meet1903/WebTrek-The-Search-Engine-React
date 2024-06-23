import React from "react"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WebTrekLogoFont from '../assets/webtrek-font.png'
import BackgroundImage from '../assets/background-image.png'

export default function History(props = null) { 
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
                    <button type="submit" className="button-2">Clean History</button>
                </form>
            </div>
            {props.history ? (
                <>
                <div className="query-history">
                    <h2 className="history-title">Query History</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Query</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.history.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.query}</td>
                                    <td>{item.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <div className="button-2-container" style={{ marginTop: '20px' }}>
                        {props.prev_page && (
                            <>
                            {/* Need Nevigation support here */}
                            <a href="{{ url_for('history', page=current_page - 1) }}"><button className="button-2">Previous</button></a>
                            </>
                        )}
                        {/* Need Nevigation support here */}
                        {props.next_page && (
                            <a href="{{ url_for('history', page=current_page + 1) }}"><button className="button-2">Next</button></a>
                        )}
                    </div>
                </div>
                </>
            ) : (
            <p>No query history available.</p>
            ) }
        </div>
    )
}