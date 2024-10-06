import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';

interface HlsPlayerProps {
    videoSrc: string;
}

const HlsPlayer: React.FC<HlsPlayerProps> = ({ videoSrc }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [quality, setQuality] = useState<string>('720p');
    const [hls, setHls] = useState<Hls | null>(null);

    useEffect(() => {
        if (videoRef.current && isPlaying) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(videoSrc);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    videoRef.current?.play();
                });
            } else if (
                videoRef.current.canPlayType('application/vnd.apple.mpegurl')
            ) {
                videoRef.current.src = videoSrc;
                videoRef.current.addEventListener('loadedmetadata', () => {
                    videoRef.current?.play();
                });
            }
        }
    }, [videoSrc, isPlaying]);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    if (!isPlaying) {
        return <button onClick={handlePlay}>Play</button>;
    }

    // const handleQualityChange = (
    //     event: React.ChangeEvent<HTMLSelectElement>,
    // ) => {
    //     const selectedQuality = event.target.value;
    //     setQuality(selectedQuality);
    //     if (hls && videoRef.current) {
    //         hls.loadSource(`${videoSrc}/${selectedQuality}.m3u8`);
    //         hls.attachMedia(videoRef.current);
    //     }
    // };

    return (
        <div>
            {/* <div>
                <label htmlFor="quality">Select Quality: </label>
                <select
                    id="quality"
                    value={quality}
                    // onChange={handleQualityChange}
                >
                    <option value="720p">720p</option>
                    <option value="480p">480p</option>
                    <option value="360p">360p</option>
                    <option value="144p">144p</option>
                </select>
            </div> */}
            <video ref={videoRef} width="400" height="280" controls />
        </div>
    );
};

export default HlsPlayer;
