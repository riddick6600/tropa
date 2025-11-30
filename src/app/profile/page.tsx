"use client";

import { Header } from '@/components/ui/Header';
import { useGamification } from '@/lib/context/GamificationContext';
import { PLACE_CONTENT, ROUTE_CONTENT } from '@/lib/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const { userData, setName } = useGamification();
    const [inputName, setInputName] = useState('');

    useEffect(() => {
        if (userData.name) {
            setInputName(userData.name);
        }
    }, [userData.name]);

    const handleSaveName = () => {
        if (inputName.trim()) {
            setName(inputName.trim());
        }
    };

    // Helper to find name by ID
    const getPlaceName = (id: string) => {
        const place = Object.values(PLACE_CONTENT).find(p => p.id === id);
        return place ? place.title : id;
    };

    const getRouteName = (id: string) => {
        for (const group of Object.values(ROUTE_CONTENT)) {
            for (const route of Object.values(group.routes)) {
                const parts = id.split('-');
                const direction = parts.pop();
                const slug = parts.join('-');

                if (group.id === slug && route.slug === direction) {
                    return `${group.title}: ${route.name}`;
                }
            }
        }
        if (id.includes('to')) return 'Малая Рица: Туда';
        if (id.includes('back')) return 'Малая Рица: Обратно';
        return id;
    };

    return (
        <>
            <Header title="Личный Кабинет" />
            <div className="container" style={{ paddingTop: '2rem' }}>

                <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--muted)' }}>Ваше Имя</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="text"
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                                placeholder="Введите имя"
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid var(--border)',
                                    background: 'var(--card)',
                                    color: 'var(--foreground)',
                                    outline: 'none'
                                }}
                            />
                            <button className="btn btn-primary" onClick={handleSaveName} style={{ width: 'auto' }}>
                                Сохранить
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '12px', border: '1px solid var(--primary)' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Ваши Баллы</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{userData.points}</span>
                    </div>
                </div>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>История Активности</h2>

                <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                    {userData.history && userData.history.length > 0 ? (
                        <ul style={{ listStyle: 'none' }}>
                            {userData.history.map((item) => (
                                <li key={item.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: '500' }}>{item.message}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                    <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>+{item.points}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{ color: '#64748b', textAlign: 'center' }}>История пока пуста.</p>
                    )}
                </div>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Достижения</h2>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    {userData.visitedPlaces.length === 0 && userData.completedRoutes.length === 0 ? (
                        <p style={{ color: '#64748b', textAlign: 'center' }}>Пока нет достижений.</p>
                    ) : (
                        <ul style={{ listStyle: 'none' }}>
                            {userData.visitedPlaces.map((id) => (
                                <li key={id} style={{ padding: '10px 0', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{getPlaceName(id)}</span>
                                    <span style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>Посещено</span>
                                </li>
                            ))}
                            {userData.completedRoutes.map((id) => (
                                <li key={id} style={{ padding: '10px 0', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{getRouteName(id)}</span>
                                    <span style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>Пройдено</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem' }}>Куда отправиться?</h3>
                    <Link href="/personality/uvarova" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                        👤 Личность: П.С. Уварова
                    </Link>
                    <Link href="/places/eshera" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                        🏛 Место: Эшера
                    </Link>
                    <Link href="/places/ritsa" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                        🌊 Место: Озеро Рица
                    </Link>
                    <Link href="/places/malaya-ritsa" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                        🌲 Место: Малая Рица
                    </Link>
                </div>
            </div>
        </>
    );
}
