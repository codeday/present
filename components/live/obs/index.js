import React, { useState, useEffect } from "react";
import Video from "./video";
import FallbackSlide from "./fallbackslide";

const INTERVAL = 5 * 60 * 1000;
export default function OBS() {
  return (
    <>
      <Video fallback={<FallbackSlide />} purpose="live" />
    </>
  );
}
