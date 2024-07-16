import React from "react"
import BackgroundImage from '../assets/background-image.png'
import WebTrekLogoFont from '../assets/webtrek-font.png'

export default function Scraper() { 
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
        </div>   
    )
}