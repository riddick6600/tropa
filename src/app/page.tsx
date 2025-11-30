"use client";

import { useGamification } from "@/lib/context/GamificationContext";
import Link from "next/link";

export default function Home() {
    const { userData } = useGamification();

    return (
        <div className="container">
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                paddingTop: '1rem'
            }}>
                <div>
                    <h1 className="title-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Тропы Наследия</h1>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Мультимедийный гид</p>
                </div>
                <Link href="/profile" className="icon-badge" style={{ textDecoration: 'none' }}>
                    <span style={{ fontWeight: 'bold' }}>{userData.points}</span>
                </Link>
            </header>

            <section style={{ marginBottom: '2rem' }}>
                <h2 className="section-header">Личности</h2>
                <Link href="/personality/uvarova" className="menu-card">
                    <div className="icon-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </div>
                    <div className="menu-card-content">
                        <div className="menu-card-title">П.С. Уварова</div>
                        <div className="menu-card-subtitle">Археолог и исследовательница</div>
                    </div>
                    <svg className="icon" style={{ color: 'var(--muted)' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </Link>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 className="section-header">Места</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link href="/places/eshera" className="menu-card">
                        <div className="icon-badge">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V7l8-4 8 4v14" /><path d="M17 21v-8.5a2.5 2.5 0 0 0-5 0V21" /></svg>
                        </div>
                        <div className="menu-card-content">
                            <div className="menu-card-title">Эшера</div>
                            <div className="menu-card-subtitle">Древнее городище</div>
                        </div>
                        <svg className="icon" style={{ color: 'var(--muted)' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </Link>

                    <Link href="/places/ritsa" className="menu-card">
                        <div className="icon-badge">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
                        </div>
                        <div className="menu-card-content">
                            <div className="menu-card-title">Озеро Рица</div>
                            <div className="menu-card-subtitle">Жемчужина Абхазии</div>
                        </div>
                        <svg className="icon" style={{ color: 'var(--muted)' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </Link>

                    <Link href="/places/malaya-ritsa" className="menu-card">
                        <div className="icon-badge">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
                        </div>
                        <div className="menu-card-content">
                            <div className="menu-card-title">Малая Рица</div>
                            <div className="menu-card-subtitle">Скрытое озеро</div>
                        </div>
                        <svg className="icon" style={{ color: 'var(--muted)' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </Link>
                </div>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 className="section-header">Маршруты</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link href="/route/malaya-ritsa/to" className="menu-card">
                        <div className="icon-badge" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', color: '#0284c7' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                        </div>
                        <div className="menu-card-content">
                            <div className="menu-card-title">Тропа на Малую Рицу</div>
                            <div className="menu-card-subtitle">Маршрут "Туда"</div>
                        </div>
                        <svg className="icon" style={{ color: 'var(--muted)' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </Link>

                    <Link href="/route/malaya-ritsa/back" className="menu-card">
                        <div className="icon-badge" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', color: '#0284c7' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12l-7 7-7-7" /></svg>
                        </div>
                        <div className="menu-card-content">
                            <div className="menu-card-title">Спуск к Большой Рице</div>
                            <div className="menu-card-subtitle">Маршрут "Обратно"</div>
                        </div>
                        <svg className="icon" style={{ color: 'var(--muted)' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </Link>
                </div>
            </section>

            <section>
                <Link href="/profile" className="btn btn-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    Личный кабинет
                </Link>
            </section>
        </div>
    );
}