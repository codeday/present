"use client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Video(purpose) {
    const [videoUrls, setVideoUrls] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!purpose.purpose) return;

        const fetchData = async () => {
            try {
                const query = `
                query {
                    cms {
                        bumpers(where: {purpose_contains_some: ["${purpose.purpose}"]}) {
                            items {
                                video 
                            }
                        }
                    }
                }
            `;

                const response = await fetch("https://graph.codeday.org", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ query }),
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const result = await response.json();
                const items = result.data.cms.bumpers.items;
                console.log(items);
                const videoUrls = items
                    .map((item) => {
                        const playbackID = item.video?.playbackId;
                        return playbackID
                            ? `https://stream.mux.com/${playbackID}.m3u8`
                            : null;
                    })
                    .filter((url) => url !== null);

                if (videoUrls.length > 0) {
                    setVideoUrls(videoUrls);
                    setCurrentVideoIndex(0);
                    console.log(videoUrls);
                } else {
                    setError("No videos found for the given purpose");
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
            }
        };

        fetchData();
    }, [purpose]);

    const handleVideoEnd = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
    };

    return (
        <>
            <div
                style={{ backgroundColor: "#FE7476" }}
            >
                {error ? (
                    <p>Error: {error}</p>
                ) : videoUrls.length > 0 ? (
                    <ReactPlayer
                        style={{ aspectRatio: '1920 / 1080', border: 0, position: 'relative'  }}
                        url={videoUrls[currentVideoIndex]}
                        controls={false}
                        playing={true}
                        muted={true}
                        autoplay={true}
                        pip={false}
                        progressInterval={100}
                        onEnded={handleVideoEnd}
                        width="100%"
                        height="100%"
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
}