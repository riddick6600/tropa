"use client";

import MapSimulation from '@/components/features/MapSimulation';
import ValidationButton from '@/components/features/ValidationButton';
import { useAudio } from '@/lib/context/AudioContext';
import { PLACE_CONTENT } from '@/lib/data';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PlacePage() {
    const params = useParams();
    const slug = params?.slug as string;

    // Find place data by slug (keys in PLACE_CONTENT match the slug or we map them)
    // In data.ts keys are: eshera, ritsa, malayaRitsa
    // But URLs are: /places/eshera, /places/ritsa, /places/malaya-ritsa

    let placeKey = slug;
    if (slug === 'malaya-ritsa') placeKey = 'malayaRitsa';

    const place = PLACE_CONTENT[placeKey as keyof typeof PLACE_CONTENT];
    const { play, currentTrack, isPlaying } = useAudio();

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
            audioId: place.id
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

            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <button
                    onClick={handlePlay}
                    className="btn btn-primary"
                    style={{ marginBottom: '1.5rem' }}
                >
                    {isCurrentTrack && isPlaying ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6zm8-14v14h4V5z" /></svg>
                            Слушать историю
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                            Слушать историю (+50 баллов)
                        </>
                    )}
                </button>

                <div style={{ lineHeight: '1.8', color: 'var(--foreground)', whiteSpace: 'pre-line', fontSize: '1.05rem' }}>
                    {place.content}
                </div>
            </div>
        </div>
    );
}
