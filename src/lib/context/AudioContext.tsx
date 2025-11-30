"use client";

import React, { createContext, useCallback, useContext, useState } from 'react';

interface AudioTrack {
    title: string;
    audioId: string;
}

interface AudioContextType {
    currentTrack: AudioTrack | null;
    isPlaying: boolean;
    volume: number;
    play: (track: AudioTrack) => void;
    pause: () => void;
    stop: () => void;
    setVolume: (vol: number) => void;
    togglePlay: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(70);

    const play = useCallback((track: AudioTrack) => {
        if (currentTrack?.audioId !== track.audioId) {
            setCurrentTrack(track);
        }
        setIsPlaying(true);
    }, [currentTrack]);

    const pause = useCallback(() => {
        setIsPlaying(false);
    }, []);

    const stop = useCallback(() => {
        setIsPlaying(false);
        setCurrentTrack(null);
    }, []);

    const togglePlay = useCallback(() => {
        if (currentTrack) {
            setIsPlaying(prev => !prev);
        }
    }, [currentTrack]);

    return (
        <AudioContext.Provider value={{
            currentTrack,
            isPlaying,
            volume,
            play,
            pause,
            stop,
            setVolume,
            togglePlay
        }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
}
