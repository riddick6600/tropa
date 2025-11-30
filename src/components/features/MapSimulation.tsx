'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './MapSimulation.module.css';

interface MapSimulationProps {
    placeName: string;
    coords: { lat: number; lon: number; name?: string };
    showRoute?: boolean;
}

declare global {
    interface Window {
        ymaps: any;
    }
}

export default function MapSimulation({ placeName, coords, showRoute = false }: MapSimulationProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [showUserMarker, setShowUserMarker] = useState(false);
    const [mapInstance, setMapInstance] = useState<any>(null);
    const [userPlacemark, setUserPlacemark] = useState<any>(null);

    useEffect(() => {
        // Загрузка Яндекс.Карт API
        if (!document.getElementById('yandex-maps-script')) {
            const script = document.createElement('script');
            script.id = 'yandex-maps-script';
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU';
            script.async = true;
            document.head.appendChild(script);
        }

        // Инициализация карты
        const initMap = () => {
            if (!mapRef.current || !window.ymaps) return;

            window.ymaps.ready(() => {
                const map = new window.ymaps.Map(mapRef.current, {
                    center: [coords.lat, coords.lon],
                    zoom: 14,
                    controls: ['zoomControl', 'fullscreenControl']
                });

                // Маркер места
                const placemark = new window.ymaps.Placemark(
                    [coords.lat, coords.lon],
                    {
                        balloonContent: `<strong>${placeName}</strong><br>${coords.name || ''}`
                    },
                    {
                        preset: 'islands#redDotIcon',
                        iconColor: '#d4af37'
                    }
                );
                map.geoObjects.add(placemark);

                // Если маршрут, добавить дополнительные точки
                if (showRoute) {
                    const routePoints = [
                        { coords: [coords.lat - 0.01, coords.lon - 0.01], name: 'Точка 1' },
                        { coords: [coords.lat + 0.005, coords.lon + 0.005], name: 'Точка 2' },
                        { coords: [coords.lat + 0.015, coords.lon + 0.015], name: 'Точка 3' }
                    ];

                    routePoints.forEach(point => {
                        const marker = new window.ymaps.Placemark(
                            point.coords,
                            { balloonContent: point.name },
                            { preset: 'islands#blueDotIcon' }
                        );
                        map.geoObjects.add(marker);
                    });
                }

                setMapInstance(map);
            });
        };

        if (window.ymaps) {
            initMap();
        } else {
            const checkYmaps = setInterval(() => {
                if (window.ymaps) {
                    clearInterval(checkYmaps);
                    initMap();
                }
            }, 100);

            return () => clearInterval(checkYmaps);
        }
    }, [coords.lat, coords.lon, placeName, coords.name, showRoute]);

    const handleShowMe = () => {
        if (!mapInstance || !window.ymaps) return;

        setShowUserMarker(true);

        // Имитация геолокации пользователя (немного смещенная от основной точки)
        const userCoords = [coords.lat + 0.002, coords.lon - 0.002];

        const userMarker = new window.ymaps.Placemark(
            userCoords,
            {
                balloonContent: '<strong>Вы здесь</strong>'
            },
            {
                preset: 'islands#greenCircleDotIcon'
            }
        );

        mapInstance.geoObjects.add(userMarker);
        setUserPlacemark(userMarker);

        // Анимация: центрировать карту на пользователе
        mapInstance.setCenter(userCoords, 15, { duration: 500 });
    };

    return (
        <div className={styles.mapContainer}>
            {/* Контейнер для Яндекс.Карты */}
            <div ref={mapRef} style={{ width: '100%', height: '300px', borderRadius: '12px' }} />

            {/* Кнопка "Показать меня" */}
            <button
                className={styles.showMeButton}
                onClick={handleShowMe}
                disabled={showUserMarker}
                style={{ marginTop: '12px' }}
            >
                {showUserMarker ? (
                    <>✅ Вы на карте</>
                ) : (
                    <>📍 Показать меня на карте</>
                )}
            </button>
        </div>
    );
}
