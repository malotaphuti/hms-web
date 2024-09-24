'use client';

import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function VideoPage() {
    const router = useRouter();
    const { id, quality } = router.query;

    const [videoData, setVideoData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/vd/stream/${id}/${quality}`,
                );
                setVideoData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load video data');
                setLoading(false);
            }
        };

        fetchVideoData();
    }, [id, quality]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <video controls>
                <source src={videoData.url} type="video/mp4" />
                <p>Your browser may not support the video tag.</p>
            </video>
        </div>
    );
}
