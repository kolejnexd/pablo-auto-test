'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function HeroVideo() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isVideoReady, setIsVideoReady] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedData = () => {
            setIsVideoReady(true);
        };

        video.addEventListener('loadeddata', handleLoadedData);

        // If already ready (e.g. from cache)
        if (video.readyState >= 3) {
            handleLoadedData();
        }

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData);
        };
    }, []);

    return (
        <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white">
            {/* Poster Image - Fades out when video is ready */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/hero-laweta-poster.webp"
                alt="Abschleppdienst Pablo Hero Poster"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${isVideoReady ? 'opacity-0' : 'opacity-100'
                    }`}
            />

            {/* Video - Fades in when ready */}
            <video
                ref={videoRef}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${isVideoReady ? 'opacity-100' : 'opacity-0'
                    }`}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                poster="/hero-laweta-poster.webp"
                aria-hidden="true"
                tabIndex={-1}
            >
                <source src="/hero-laweta-loop.webm" type="video/webm" />
                <source src="/hero-laweta-loop.mp4" type="video/mp4" />
            </video>

            {/* Overlay - Always visible */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />
        </div>
    );
}
