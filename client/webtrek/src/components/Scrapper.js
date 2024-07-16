import React from "react"
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BackgroundImage from '../assets/background-image.png'
import WebTrekLogoFont from '../assets/webtrek-font.png'

export default function Scraper() {

    const [url, setUrl] = useState('');
    const [path, setPath] = useState('');


    const scrape = async (url, path) => {
        try {
            document.getElementById('loader').classList.remove('hidden');
            document.getElementById('visible-container').classList.add('hidden');
            const response = await axios.post(`/scrapper`, null, {
                params: { url, path }
            });
            const data = response.data;
            console.log(data);
            document.getElementById("message").innerHTML = data.message;
        } catch (error) {
            console.error("Error scraping:", error);
        } finally {
            document.getElementById('loader').classList.add('hidden');
            document.getElementById('visible-container').classList.remove('hidden');
        }
    }

    const handleScrape = (event) => {
        event.preventDefault();
        scrape(url, path);
    }

    return (
        <div>
            <div className="background-image">
                <img src={BackgroundImage} alt="" srcset="" />
            </div>
            <div className="header">
                <h1>
                    <a href="/" className="title-name">
                        <img src={WebTrekLogoFont} alt="WebTrek" className="webtrek-font" />
                    </a>
                </h1>
            </div>
            <div className="loader-container">
                <div className="loader hidden" id="loader"></div>
            </div>
            <div className="" id="visible-container">
                <div className="button-2-container">
                    <Link to="/">
                        <button className="button-1">Back to Search Engine</button>
                    </Link>
                </div>
                <form method="post" id="scraping-form" className="regular-form" onSubmit={handleScrape}>
                    <label for="url">Enter comma separated domains:</label><br />
                    <input
                        type="text"
                        id="url"
                        name="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        class="form-text"
                        style={{ marginBottom: '20px' }}
                        required
                    />
                    <br />
                    <label for="path">Enter destination folder path:</label><br />
                    <input
                        type="text"
                        id="path"
                        name="path"
                        value={path}
                        onChange={(e) => setPath(e.target.value)}
                        class="form-text"
                        style={{ marginBottom: '20px' }}
                        required
                    />
                    <br />
                    <input type="hidden" id="folder_path" name="folder_path" class="form-text" />
                    <button type="submit" id="scrapper" class="submit-button">Scrape</button>
                </form>
            </div>
            <p id="message" className="message"></p>
        </div>
    )
}