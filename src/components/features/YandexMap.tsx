"use client";

import { useEffect, useRef, useState } from 'react';

interface YandexMapProps {
    center: [number, number];
    markers?: Array<{
        coords: [number, number];
        title: string;
        description?: string;
    }>;
    showUserLocation?: boolean;
    zoom?: number;
}

declare global {
    interface Window {
        ymaps: any;
    }
}

/**
 * Компонент для отображения Яндекс.Карты с маркерами и геолокацией
 */
export default function YandexMap({
    center,
    markers = [],
    showUserLocation = true,
    zoom = 13
}: YandexMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapInstance, setMapInstance] = useState<any>(null);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    // Загрузка Яндекс.Карт API
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Проверяем, загружен ли уже скрипт
        if (window.ymaps) {
            window.ymaps.ready(() => {
                initMap();
            });
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU';
        script.async = true;
        script.onload = () => {
            window.ymaps.ready(() => {
                initMap();
            });
        };
        document.head.appendChild(script);

        return () => {
            // Cleanup при размонтировании
            if (mapInstance) {
                mapInstance.destroy();
            }
        };
    }, []);

    // Получение геолокации пользователя
    useEffect(() => {
        if (showUserLocation && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    console.log('Геолокация недоступна:', error);
                }
            );
        }
    }, [showUserLocation]);

    // Инициализация карты
    const initMap = () => {
        if (!mapRef.current || !window.ymaps) return;

        const map = new window.ymaps.Map(mapRef.current, {
            center: center,
            zoom: zoom,
            controls: ['zoomControl', 'geolocationControl']
        });

        setMapInstance(map);

        // Добавление маркеров
        markers.forEach((marker) => {
            const placemark = new window.ymaps.Placemark(
                marker.coords,
                {
                    balloonContent: `<strong>${marker.title}</strong>${marker.description ? `<br/>${marker.description}` : ''}`
                },
                {
                    preset: 'islands#blueCircleDotIcon'
                }
            );
            map.geoObjects.add(placemark);
        });

        // Добавление маркера текущей геолокации
        if (userLocation) {
            const userPlacemark = new window.ymaps.Placemark(
                userLocation,
                {
                    balloonContent: 'Вы здесь'
                },
                {
                    preset: 'islands#redCircleDotIcon'
                }
            );
            map.geoObjects.add(userPlacemark);
        }
    };

    // Обновление маркера геолокации при изменении
    useEffect(() => {
        if (mapInstance && userLocation) {
            const userPlacemark = new window.ymaps.Placemark(
                userLocation,
                {
                    balloonContent: 'Вы здесь'
                },
                {
                    preset: 'islands#redCircleDotIcon'
                }
            );
            mapInstance.geoObjects.add(userPlacemark);
        }
    }, [userLocation, mapInstance]);

    return (
        <div
            ref={mapRef}
            style={{
                width: '100%',
                height: '400px',
                borderRadius: 'var(--radius)',
                overflow: 'hidden'
            }}
        />
    );
}
