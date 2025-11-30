'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Хук для обработки URL параметров и автоматического выполнения действий
 */
export function useURLParams() {
    const searchParams = useSearchParams();

    const verify = searchParams.get('verify') === 'true';
    const autoPlay = searchParams.get('play') === 'true';

    return {
        verify,
        autoPlay
    };
}

/**
 * Хук для автоматической верификации места при наличии параметра ?verify=true
 */
export function useAutoVerify(placeId: string, visitPlace: (id: string) => void, isVisited: boolean) {
    const { verify } = useURLParams();

    useEffect(() => {
        if (verify && !isVisited) {
            // Небольшая задержка для лучшего UX
            const timer = setTimeout(() => {
                visitPlace(placeId);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [verify, isVisited, placeId, visitPlace]);
}

/**
 * Хук для автоматического запуска аудио при наличии /play в URL
 */
export function useAutoPlayAudio(
    setIsPlaying: (playing: boolean) => void,
    audioId: string | undefined,
    listenAudio: (id: string) => void
) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isPlayRoute = window.location.pathname.endsWith('/play');

            if (isPlayRoute && audioId) {
                // Небольшая задержка для загрузки компонента
                const timer = setTimeout(() => {
                    setIsPlaying(true);
                    listenAudio(audioId);
                }, 300);

                return () => clearTimeout(timer);
            }
        }
    }, [audioId, setIsPlaying, listenAudio]);
}
