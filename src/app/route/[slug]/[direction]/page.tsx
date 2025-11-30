"use client";

import ValidationButton from '@/components/features/ValidationButton';
import { useAudio } from '@/lib/context/AudioContext';
import { ROUTE_CONTENT } from '@/lib/data';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function RoutePage() {
    const params = useParams();
    const { slug, direction } = params as { slug: string; direction: string };
    const { play } = useAudio();
    const hasAutoPlayedRef = useRef(false);

    // Find route group by id matching the slug
    const routeGroup = Object.values(ROUTE_CONTENT).find(group => group.id === slug);
    if (!routeGroup) return notFound();

    const route = routeGroup.routes[direction as keyof typeof routeGroup.routes];
    if (!route) return notFound();

    const routeId = `${slug}-${direction}`;

    // Auto-play logic
    // Auto-play logic
    useEffect(() => {
        // Check hash for #play
        if (typeof window !== 'undefined' && window.location.hash === '#play' && !hasAutoPlayedRef.current) {
            hasAutoPlayedRef.current = true;
            play({
                title: route.audioTitle,
                audioId: routeId
            });
        }
    }, [play, route.audioTitle, routeId]);

    const handlePlay = () => {
        play({
            title: route.audioTitle,
            audioId: routeId
        });
    };

    return (
        <div className="container">
            <div style={{ marginBottom: '1.5rem' }}>
                <Link href="/" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                    Назад
                </Link>
                <h1 className="title-gradient" style={{ fontSize: '1.8rem', lineHeight: '1.2', marginBottom: '0.5rem' }}>{routeGroup.title}</h1>
                <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>{route.name}</p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    borderLeft: '4px solid var(--accent)'
                }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Статус маршрута</h3>
                    <ValidationButton
                        placeId={routeId}
                        type="route"
                        label="🏁 Я прошел маршрут"
                    />
                </div>

                <button
                    onClick={handlePlay}
                    className="btn btn-primary"
                    style={{ marginBottom: '1.5rem' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                    Слушать гид о маршруте
                </button>

                <div style={{ lineHeight: '1.6', color: 'var(--foreground)', whiteSpace: 'pre-line' }}>
                    {route.description}
                </div>
            </div>
        </div>
    );
}
