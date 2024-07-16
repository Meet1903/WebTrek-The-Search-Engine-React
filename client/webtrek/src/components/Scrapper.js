import React from "react"
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BackgroundImage from '../assets/background-image.png'
import WebTrekLogoFont from '../assets/webtrek-font.png'

export default function Scraper() {

    const [url, setUrl] = useState('');
    const [path, setPath] = useState('');

    useEffect(() => {
        const form = document.getElementById("scraping-form");
        if (form) {
            form.addEventListener("submit", showLoadingSpinner);
        }

        return () => {
            if (form) {
                form.removeEventListener("submit", showLoadingSpinner);
            }
        };
    }, []);

    const showLoadingSpinner = () => {
        let loadingSpinner = document.querySelector(".loader");
        if (loadingSpinner) {
            loadingSpinner.style.display = "block";
        }
        let container = document.querySelector(".container");
        if (container) {
            container.style.display = "block";
        }
    }

    const scrape = async (url, path) => {
        try {
            const response = await axios.post(`/scrapper`, null, {
                params: { url, path }
            });
            const data = response.data;
            console.log(data);
            document.getElementById("message").innerHTML = data.message;
        } catch (error) {
            console.error("Error scraping:", error);
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
            <div className="button-2-container">
                <Link to="/">
                    <button className="button-1">Back to Search Engine</button>
                </Link>
            </div>
            <div className="loader" id="loader"></div>
            <div className="container" id="container"></div>
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
            <h4 id="message" className="message"></h4>
        </div>
    )
}