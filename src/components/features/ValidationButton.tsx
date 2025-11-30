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
                className="w-full py-3 px-6 bg-green-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 opacity-90 cursor-default"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                {type === 'place' ? 'Вы на месте' : 'Маршрут пройден'}
            </button>
        );
    }

    return (
        <button
            onClick={handleValidate}
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-xl font-medium text-white transition-all transform active:scale-95
                ${isLoading ? 'bg-gray-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'}
            `}
        >
            {isLoading ? 'Проверка геолокации...' : label}
        </button>
    );
}
