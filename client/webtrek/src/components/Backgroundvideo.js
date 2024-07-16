import React from "react";
import BackgroundVideoSrc from '../assets/background-video.mp4'

export default function BackgroundVideo() {
  return (
    <video autoPlay loop muted>
      <source src={BackgroundVideoSrc} type="video/mp4" />
    </video>
  );
}