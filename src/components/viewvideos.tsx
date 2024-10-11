import useVideoData from '@/app/api/useVideoData';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import viewAssignment from '@/app/api/useAssignment';

export default function viewvideo() {
    const { videodata, notfound, found, loading, error } = useVideoData();

    // list/assign/
    if (videodata) {
        return (
            <div>
                {videodata &&
                    videodata.map(video => (
                        <div
                            key={video.id}
                            className="px-2 h-[60px] flex flex-row items-center"
                        >
                            {video.title} - watch video - assignment
                            <Button className="mx-2">
                                <Link href={`/videos/${video.id}/360p`}>
                                    watch
                                </Link>
                            </Button>
                        </div>
                    ))}
            </div>
        );
    }
}
