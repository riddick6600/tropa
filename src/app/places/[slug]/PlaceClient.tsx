"use client";

import MapSimulation from '@/components/features/MapSimulation';
import ValidationButton from '@/components/features/ValidationButton';
import { useAudio } from '@/lib/context/AudioContext';
import { PLACE_CONTENT } from '@/lib/data';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function PlaceClient() {
    const params = useParams();
    const { slug } = params as { slug: string };

    // Find place data by slug (keys in PLACE_CONTENT match the slug or we map them)
    // In data.ts keys are: eshera, ritsa, malayaRitsa
    // But URLs are: /places/eshera, /places/ritsa, /places/malaya-ritsa

    // Find place by id matching the slug
    const place = Object.values(PLACE_CONTENT).find(p => p.id === slug);
    const { play, currentTrack, isPlaying } = useAudio();

    // Auto-play logic
    useEffect(() => {
        if (place && typeof window !== 'undefined' && window.location.hash === '#play') {
            play({
                title: place.audioTitle,
                audioId: place.id,
                audioUrl: place.audioUrl
            });
        }
    }, [play, place]);

    if (!place) {
        return (
            <div className="container" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <h1>Место не найдено</h1>
                <Link href="/" className="btn btn-primary">На главную</Link>
            </div>
        );
    }

    const handlePlay = () => {
        play({
            title: place.audioTitle,
            audioId: place.id,
            audioUrl: place.audioUrl
        });
    };

    const isCurrentTrack = currentTrack?.audioId === place.id;

    return (
        <div className="container">
            <div style={{ marginBottom: '1.5rem' }}>
                <Link href="/" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                    Назад
                </Link>
                <h1 className="title-gradient" style={{ fontSize: '2rem', lineHeight: '1.2', marginBottom: '0.5rem' }}>{place.title}</h1>
                <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>{place.subtitle}</p>
            </div>

            <div className="glass-panel" style={{ padding: '1rem', marginBottom: '2rem' }}>
                <MapSimulation
                    placeName={place.title}
                    coords={place.coords}
                />
                <div style={{ marginTop: '1rem' }}>
                    <ValidationButton placeId={place.id} />
                </div>
            </div>

            <button
                onClick={handlePlay}
                className="btn btn-primary"
                style={{
                    position: 'sticky',
                    top: '80px',
                    marginBottom: '1.5rem',
                    zIndex: 50
                }}
            >
                {isCurrentTrack && isPlaying ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6zm8-14v14h4V5z" /></svg>
                        Пауза
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        Слушать историю
                    </>
                )}
            </button>

            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ lineHeight: '1.8', color: 'var(--foreground)', whiteSpace: 'pre-line', fontSize: '1.05rem' }}>
                    {place.content}
                </div>

                {place.id === 'malaya-ritsa' && (
                    <div style={{ marginTop: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Маршруты</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Link href="/route/malaya-ritsa/to" className="menu-card">
                                <div className="icon-badge" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', color: '#0284c7' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                                </div>
                                <div className="menu-card-content">
                                    <div className="menu-card-title">Тропа на Малую Рицу</div>
                                    <div className="menu-card-subtitle">Маршрут "Туда"</div>
                                </div>
                            </Link>
                            <Link href="/route/malaya-ritsa/back" className="menu-card">
                                <div className="icon-badge" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', color: '#0284c7' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12l-7 7-7-7" /></svg>
                                </div>
                                <div className="menu-card-content">
                                    <div className="menu-card-title">Спуск к Большой Рице</div>
                                    <div className="menu-card-subtitle">Маршрут "Обратно"</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
