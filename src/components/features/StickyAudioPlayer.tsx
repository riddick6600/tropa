"use client";

import { useAudio } from '@/lib/context/AudioContext';
import { useGamification } from '@/lib/context/GamificationContext';
import { getAssetPath } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import styles from './AudioPlayer.module.css';

export default function StickyAudioPlayer() {
    const { currentTrack, isPlaying, volume, togglePlay, setVolume, stop } = useAudio();
    const { listenAudio } = useGamification();
    const audioRef = useRef<HTMLAudioElement>(null);
    const pointsAwardedRef = useRef<Set<string>>(new Set()); // Отслеживание начисленных баллов

    // Award points when audio starts playing (only once per track)
    useEffect(() => {
        if (isPlaying && currentTrack && !pointsAwardedRef.current.has(currentTrack.audioId)) {
            pointsAwardedRef.current.add(currentTrack.audioId);
            listenAudio(currentTrack.audioId);
        }
    }, [isPlaying, currentTrack, listenAudio]);

    // Синхронизация состояния воспроизведения с audio элементом
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play().catch(err => {
                console.error('Ошибка воспроизведения:', err);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // Синхронизация громкости
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    // Сброс аудио при смене трека
    useEffect(() => {
        if (audioRef.current && currentTrack) {
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch(err => {
                    console.error('Ошибка воспроизведения:', err);
                });
            }
        }
    }, [currentTrack]);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/audio/uvarova.mp3';
        // Используем название трека для имени файла
        const fileName = currentTrack?.title
            ? `${currentTrack.title.replace(/[^a-zа-яё0-9]/gi, '_')}.mp3`
            : 'audiogid.mp3';
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!currentTrack) {
        return null;
    }

    return (
        <div className={styles.player}>
            {/* HTML5 Audio элемент */}
            <audio
                ref={audioRef}
                preload="metadata"
                playsInline // Важно для iOS
                src={currentTrack.audioUrl || getAssetPath('/audio/uvarova.mp3')}
            >
                {/* Fallback source is not needed if we set src on audio, but keeping it as legacy just in case */}
                <source src={currentTrack.audioUrl || getAssetPath('/audio/uvarova.mp3')} type="audio/mpeg" />
                Ваш браузер не поддерживает аудио элемент.
            </audio>

            <div className={styles.info}>
                <span className={styles.subtitle}>Аудиогид</span>
                <span className={styles.title}>{currentTrack.title}</span>
            </div>

            <div className={styles.controls}>
                <button className={styles.playBtn} onClick={togglePlay} title={isPlaying ? "Пауза" : "Воспроизвести"}>
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6zm8-14v14h4V5z" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                    )}
                </button>

                <button className={styles.stopBtn} onClick={stop} title="Стоп">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z" /></svg>
                </button>

                <button
                    className={styles.downloadBtn}
                    onClick={handleDownload}
                    title="Скачать MP3"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
