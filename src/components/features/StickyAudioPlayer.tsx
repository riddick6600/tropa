"use client";

import { useAudio } from '@/lib/context/AudioContext';
import { useGamification } from '@/lib/context/GamificationContext';
import { useEffect } from 'react';
import styles from './AudioPlayer.module.css';

export default function StickyAudioPlayer() {
    const { currentTrack, isPlaying, volume, togglePlay, setVolume, stop } = useAudio();
    const { listenAudio } = useGamification();

    // Award points when audio starts playing (if not already awarded)
    useEffect(() => {
        if (isPlaying && currentTrack) {
            // Check if already listened is handled inside listenAudio, 
            // but we can add a local ref check if needed to avoid spamming the context function
            listenAudio(currentTrack.audioId);
        }
    }, [isPlaying, currentTrack, listenAudio]);

    if (!currentTrack) {
        return null;
    }

    return (
        <div className={styles.player}>
            <div className={styles.info}>
                <span className={styles.subtitle}>Аудиогид</span>
                <span className={styles.title}>{currentTrack.title}</span>
            </div>

            <div className={styles.controls}>
                <button className={styles.playBtn} onClick={togglePlay}>
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6zm8-14v14h4V5z" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                    )}
                </button>

                <button className={styles.stopBtn} onClick={stop} title="Стоп">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z" /></svg>
                </button>
            </div>
        </div>
    );
}
