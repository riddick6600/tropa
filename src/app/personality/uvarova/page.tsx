"use client";

import { useAudio } from '@/lib/context/AudioContext';
import { useGamification } from '@/lib/context/GamificationContext';
import { PERSONALITY_CONTENT } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function UvarovaPage() {
    const { uvarova } = PERSONALITY_CONTENT;
    const { readArticle, userData } = useGamification();
    const { play, currentTrack, isPlaying } = useAudio();
    const contentRef = useRef<HTMLDivElement>(null);
    const hasReadRef = useRef(false);

    // Sync ref with userData
    useEffect(() => {
        if (userData.readArticles.includes(uvarova.slug)) {
            hasReadRef.current = true;
        }
    }, [userData.readArticles, uvarova.slug]);

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            if (hasReadRef.current || !contentRef.current) return;

            const rect = contentRef.current.getBoundingClientRect();
            const isVisible = rect.bottom <= window.innerHeight + 100;

            if (isVisible) {
                hasReadRef.current = true;
                readArticle(uvarova.slug);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Check on mount in case content is short
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [uvarova.slug, readArticle]);

    // Auto-play logic
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash === '#play') {
            play({
                title: uvarova.audioTitle,
                audioId: uvarova.slug
            });
        }
    }, [play, uvarova.audioTitle, uvarova.slug]);

    const handlePlay = () => {
        play({
            title: uvarova.audioTitle,
            audioId: uvarova.slug
        });
    };

    const isCurrentTrack = currentTrack?.audioId === uvarova.slug;

    return (
        <div className="container">
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                    Назад
                </Link>
                <h1 className="title-gradient" style={{ fontSize: '2rem', lineHeight: '1.2', marginBottom: '0.5rem' }}>{uvarova.title}</h1>
                <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>{uvarova.subtitle}</p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{
                    width: '100%',
                    height: '300px',
                    position: 'relative',
                    borderRadius: '12px',
                    marginBottom: '1.5rem',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <Image
                        src="/images/uvarova.png"
                        alt="П.С. Уварова"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>

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

                <div ref={contentRef} style={{ lineHeight: '1.8', color: 'var(--foreground)', whiteSpace: 'pre-line', fontSize: '1.05rem' }}>
                    {uvarova.content}
                </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h3 className="section-header">Связанные материалы</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {uvarova.relatedLinks.map((link, idx) => (
                        <Link key={idx} href={link.url} className="menu-card" style={{ padding: '12px 16px' }}>
                            <div className="icon-badge" style={{ width: '36px', height: '36px', minWidth: '36px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                            </div>
                            <span style={{ fontWeight: '500' }}>{link.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
