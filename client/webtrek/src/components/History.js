import React from "react"
import WebTrekLogoFont from '../assets/webtrek-font.png'
import BackgroundImage from '../assets/background-image.png'

export default function History(props = null) { 
    return (
        <div className="History-Fullpage">
            <div className="background-image">
                <img src={BackgroundImage} alt="" srcset="" />
            </div>
            <div className="header">
                <h1>
                    {/* Need Nevigation support here */}
                    <a href="{{ url_for('index') }}"><img src={WebTrekLogoFont} alt="" srcset="" className="webtrek-font" /></a>
                </h1>
            </div>
            <div className="button-2-container">
                {/* Need Nevigation support here */}
                <a href="{{ url_for('index') }}"><button className="button-2">Back to Search Engine</button></a>
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