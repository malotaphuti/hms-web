'use client';

import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ videoId, quality }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        if (!videoRef.current) return;

        // Initialize Video.js player
        const videoUrl = `/video/${videoId}/${quality}/`;
        const player = videojs(videoRef.current, {
            controls: true,
            autoplay: false,
            preload: 'auto',
            responsive: true,
            fluid: true,
            sources: [
                {
                    src: videoUrl,
                    type: 'application/x-mpegURL',
                },
            ],
        });

        playerRef.current = player;

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
            }
        };
    }, [videoId, quality]);

    return (
        <div data-vjs-player>
            <video
                ref={videoRef}
                className="video-js vjs-default-skin"
                playsInline
                controls
            />
        </div>
    );
};

export default VideoPlayer;
