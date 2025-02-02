import React, { useState, useEffect } from 'react';
import Video from './video';
import FallbackSlide from './fallbackslide';

const INTERVAL = 5 * 60 * 1000;
export default function OBS(intent = 'outro') {
  console.log("INTENT", intent);
  const [currentComponent, setCurrentComponent] = useState("Video");
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentComponent(prevComponent => {
        return prevComponent === 'Video' ? 'FallbackSlide' : 'Video';
      });
    }, INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {currentComponent === 'Video' && <Video purpose="outro" />}
      {currentComponent === 'FallbackSlide' && <FallbackSlide />}
    </>
  );
}