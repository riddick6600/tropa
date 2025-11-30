"use client";

import { useGamification } from '@/lib/context/GamificationContext';
import { useState } from 'react';

interface ValidationButtonProps {
    placeId: string;
    label?: string;
    points?: number;
    type?: 'place' | 'route';
}

export default function ValidationButton({
    placeId,
    label = "Я на месте",
    points = 100,
    type = 'place'
}: ValidationButtonProps) {
    const { visitPlace, completeRoute, userData } = useGamification();
    const [isLoading, setIsLoading] = useState(false);

    const isVisited = type === 'place'
        ? userData.visitedPlaces.includes(placeId)
        : userData.completedRoutes.includes(placeId);

    const handleValidate = () => {
        if (isVisited) return;

        setIsLoading(true);
        // Imitate GPS check delay
        setTimeout(() => {
            if (type === 'place') {
                visitPlace(placeId);
            } else {
                completeRoute(placeId);
            }
            setIsLoading(false);
        }, 1500);
    };

    if (isVisited) {
        return (
            <button
                disabled
                style={{
                    width: '100%',
                    padding: '14px 24px',
                    background: 'var(--primary)',
                    color: 'white',
                    borderRadius: 'var(--radius)',
                    fontWeight: '600',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    opacity: 0.9,
                    cursor: 'default',
                    border: 'none',
                    transition: 'all 0.3s ease'
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                {type === 'place' ? 'Вы на месте' : 'Маршрут пройден'}
            </button>
        );
    }

    return (
        <button
            onClick={handleValidate}
            disabled={isLoading}
            className="validation-btn"
            style={{
                width: '100%',
                padding: '14px 24px',
                background: isLoading ? 'var(--muted)' : 'var(--accent)',
                color: 'white',
                borderRadius: 'var(--radius)',
                fontWeight: '600',
                fontSize: '1rem',
                border: 'none',
                cursor: isLoading ? 'wait' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isLoading ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)',
                transform: 'scale(1)'
            }}
        >
            {isLoading ? 'Проверка геолокации...' : label}
            <style jsx>{`
                .validation-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
                }
                .validation-btn:active:not(:disabled) {
                    transform: translateY(0);
                }
            `}</style>
        </button>
    );
}
