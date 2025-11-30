'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

interface QRCodeGridProps {
    type: 'place' | 'route' | 'personality';
    slug?: string;
    direction?: string;
}

export default function QRCodeGrid({ type, slug, direction }: QRCodeGridProps) {
    const [urls, setUrls] = useState({
        main: '',
        verify: '',
        play: '',
        route: ''
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const base = 'https://storybook.myapsny.ru';
            const path = window.location.pathname;

            setUrls({
                main: `${base}${path}`,
                verify: type === 'place' ? `${base}${path}?verify=true` : '',
                play: `${base}${path}/play`,
                route: type === 'route' && direction ? `${base}/route/${slug}/${direction}/play` : ''
            });
        }
    }, [type, slug, direction]);

    if (!urls.main) return null;

    return (
        <div className="card" style={{ marginTop: '2rem', padding: '1.5rem' }}>
            <h3 style={{
                marginBottom: '1rem',
                textAlign: 'center',
                color: 'var(--foreground)',
                fontSize: '1.1rem',
                fontWeight: 'bold'
            }}>
                Поделиться
            </h3>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '20px',
                marginTop: '1.5rem'
            }}>
                {/* QR 1: Основной */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        background: 'white',
                        padding: '12px',
                        borderRadius: '12px',
                        display: 'inline-block',
                        border: '1px solid var(--border)'
                    }}>
                        <QRCodeSVG value={urls.main} size={100} />
                    </div>
                    <p style={{
                        fontSize: '0.75rem',
                        marginTop: '8px',
                        color: 'var(--foreground)',
                        fontWeight: '600'
                    }}>
                        📄 Страница
                    </p>
                    <p style={{
                        fontSize: '0.65rem',
                        color: 'var(--muted)',
                        marginTop: '4px'
                    }}>
                        Открыть страницу
                    </p>
                </div>

                {/* QR 2: Подтверждение локации (только для мест) */}
                {type === 'place' && urls.verify && (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            background: 'white',
                            padding: '12px',
                            borderRadius: '12px',
                            display: 'inline-block',
                            border: '1px solid var(--primary)'
                        }}>
                            <QRCodeSVG value={urls.verify} size={100} />
                        </div>
                        <p style={{
                            fontSize: '0.75rem',
                            marginTop: '8px',
                            color: 'var(--foreground)',
                            fontWeight: '600'
                        }}>
                            ✅ Отметиться
                        </p>
                        <p style={{
                            fontSize: '0.65rem',
                            color: 'var(--muted)',
                            marginTop: '4px'
                        }}>
                            +100 баллов
                        </p>
                    </div>
                )}

                {/* QR 3: Запуск аудио */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        background: 'white',
                        padding: '12px',
                        borderRadius: '12px',
                        display: 'inline-block',
                        border: '1px solid var(--accent)'
                    }}>
                        <QRCodeSVG value={urls.play} size={100} />
                    </div>
                    <p style={{
                        fontSize: '0.75rem',
                        marginTop: '8px',
                        color: 'var(--foreground)',
                        fontWeight: '600'
                    }}>
                        🎵 Аудио
                    </p>
                    <p style={{
                        fontSize: '0.65rem',
                        color: 'var(--muted)',
                        marginTop: '4px'
                    }}>
                        Запустить гид
                    </p>
                </div>

                {/* QR 4: Маршрут с аудио (только для маршрутов) */}
                {type === 'route' && urls.route && (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            background: 'white',
                            padding: '12px',
                            borderRadius: '12px',
                            display: 'inline-block',
                            border: '1px solid var(--secondary-foreground)'
                        }}>
                            <QRCodeSVG value={urls.route} size={100} />
                        </div>
                        <p style={{
                            fontSize: '0.75rem',
                            marginTop: '8px',
                            color: 'var(--foreground)',
                            fontWeight: '600'
                        }}>
                            🥾 Маршрут
                        </p>
                        <p style={{
                            fontSize: '0.65rem',
                            color: 'var(--muted)',
                            marginTop: '4px'
                        }}>
                            С аудиогидом
                        </p>
                    </div>
                )}
            </div>

            <p style={{
                fontSize: '0.7rem',
                color: 'var(--muted)',
                marginTop: '1rem',
                textAlign: 'center',
                fontStyle: 'italic'
            }}>
                Отсканируйте QR-код камерой телефона
            </p>
        </div>
    );
}
