"use client";

import ValidationButton from '@/components/features/ValidationButton';
import YandexMap from '@/components/features/YandexMap';
import { useAudio } from '@/lib/context/AudioContext';
import { MOCK_COORDINATES, ROUTE_CONTENT } from '@/lib/data';
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

    // Определяем маркеры для карты
    const mapMarkers = direction === 'to'
        ? [
            { coords: [MOCK_COORDINATES.ritsa.lat, MOCK_COORDINATES.ritsa.lon] as [number, number], title: 'Старт: Большая Рица', description: 'Начало маршрута' },
            { coords: [MOCK_COORDINATES.malayaRitsa.lat, MOCK_COORDINATES.malayaRitsa.lon] as [number, number], title: 'Финиш: Малая Рица', description: 'Конец маршрута' }
        ]
        : [
            { coords: [MOCK_COORDINATES.malayaRitsa.lat, MOCK_COORDINATES.malayaRitsa.lon] as [number, number], title: 'Старт: Малая Рица', description: 'Начало спуска' },
            { coords: [MOCK_COORDINATES.ritsa.lat, MOCK_COORDINATES.ritsa.lon] as [number, number], title: 'Финиш: Большая Рица', description: 'Конец маршрута' }
        ];

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

            {/* Карта маршрута */}
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 'bold' }}>📍 Карта маршрута</h3>
                <YandexMap
                    center={direction === 'to'
                        ? [MOCK_COORDINATES.ritsa.lat, MOCK_COORDINATES.ritsa.lon]
                        : [MOCK_COORDINATES.malayaRitsa.lat, MOCK_COORDINATES.malayaRitsa.lon]
                    }
                    markers={mapMarkers}
                    showUserLocation={true}
                    zoom={14}
                />
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--muted)' }}>
                    Красная точка — ваше местоположение. Синие точки — начало и конец маршрута.
                </p>
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
                        label="Я прошел маршрут"
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

                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 'bold' }}>📖 Описание маршрута</h3>
                <div style={{ lineHeight: '1.6', color: 'var(--foreground)', whiteSpace: 'pre-line', marginBottom: '1.5rem' }}>
                    {route.description}
                </div>

                {/* Дополнительная информация */}
                <div style={{
                    background: 'rgba(96, 165, 250, 0.1)',
                    padding: '1rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid rgba(96, 165, 250, 0.3)',
                    marginTop: '1.5rem'
                }}>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 'bold', color: '#60a5fa' }}>
                        💡 Полезные советы
                    </h4>
                    <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8', color: 'var(--foreground)' }}>
                        {direction === 'to' ? (
                            <>
                                <li>Возьмите с собой достаточно воды (минимум 1-1.5 литра на человека)</li>
                                <li>Наденьте удобную треккинговую обувь с хорошим протектором</li>
                                <li>Маршрут занимает около 2-3 часов в одну сторону</li>
                                <li>Лучшее время для похода — утро или вторая половина дня</li>
                                <li>Следуйте маркировке на деревьях, не сходите с тропы</li>
                            </>
                        ) : (
                            <>
                                <li>Спуск легче подъема, но требует внимания на скользких участках</li>
                                <li>Используйте треккинговые палки для устойчивости</li>
                                <li>Время спуска — около 1.5-2 часов</li>
                                <li>Не торопитесь, наслаждайтесь видами</li>
                                <li>После спуска можно отдохнуть у озера Большая Рица</li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
