"use client";

import { Header } from "@/components/ui/Header";
import { useGamification } from "@/lib/context/GamificationContext";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    const { userData } = useGamification();

    return (
        <>
            <Header title="Тропы Наследия" showBack={false} />
            <div className="container" style={{ maxWidth: '600px', paddingTop: '1rem' }}>

                <section className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>О проекте</h2>
                    <p style={{ color: 'var(--foreground)', lineHeight: '1.6' }}>
                        Откройте для себя Абхазию по-новому! Исследуйте древние городища, слушайте аудиогиды
                        и открывайте тайные тропы. Зарабатывайте баллы за каждое открытие!
                    </p>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 className="section-header" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Личности</h2>
                    <Link href="/personality/uvarova" className="menu-card" style={{ padding: '0', flexDirection: 'column', alignItems: 'stretch', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                            <Image
                                src="/images/uvarova.png"
                                alt="П.С. Уварова"
                                fill
                                style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
                            />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>П.С. Уварова</div>
                                <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>Археолог и исследовательница</div>
                            </div>
                        </div>
                    </Link>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 className="section-header" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Места</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        <Link href="/places/eshera" className="menu-card" style={{ padding: '0', flexDirection: 'column', alignItems: 'stretch', overflow: 'hidden' }}>
                            <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                                <Image
                                    src="/images/eshera.png"
                                    alt="Эшера"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.4rem' }}>Эшера</div>
                                    <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem' }}>Древнее городище</div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/places/ritsa" className="menu-card" style={{ padding: '0', flexDirection: 'column', alignItems: 'stretch', overflow: 'hidden' }}>
                            <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                                <Image
                                    src="/images/ritsa.png"
                                    alt="Озеро Рица"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.4rem' }}>Озеро Рица</div>
                                    <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem' }}>Жемчужина Абхазии</div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/places/malaya-ritsa" className="menu-card" style={{ padding: '0', flexDirection: 'column', alignItems: 'stretch', overflow: 'hidden' }}>
                            <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                                <Image
                                    src="/images/malaya_ritsa.png"
                                    alt="Малая Рица"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.4rem' }}>Малая Рица</div>
                                    <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem' }}>Скрытое озеро</div>
                                </div>
                            </div>
                        </Link>

                    </div>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 className="section-header" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Маршруты</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Link href="/route/malaya-ritsa/to" className="menu-card" style={{ padding: '1.5rem' }}>
                            <div className="icon-badge" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', color: '#0284c7', width: '56px', height: '56px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                            </div>
                            <div className="menu-card-content">
                                <div className="menu-card-title" style={{ fontSize: '1.1rem' }}>Тропа на Малую Рицу</div>
                                <div className="menu-card-subtitle">Маршрут "Туда"</div>
                            </div>
                            <svg className="icon" style={{ color: 'var(--muted)' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </Link>

                        <Link href="/route/malaya-ritsa/back" className="menu-card" style={{ padding: '1.5rem' }}>
                            <div className="icon-badge" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', color: '#0284c7', width: '56px', height: '56px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12l-7 7-7-7" /></svg>
                            </div>
                            <div className="menu-card-content">
                                <div className="menu-card-title" style={{ fontSize: '1.1rem' }}>Спуск к Большой Рице</div>
                                <div className="menu-card-subtitle">Маршрут "Обратно"</div>
                            </div>
                            <svg className="icon" style={{ color: 'var(--muted)' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </Link>
                    </div>
                </section>

                <section>
                    <Link href="/profile" className="btn btn-secondary" style={{ padding: '1rem', fontSize: '1.1rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        Личный кабинет
                    </Link>
                </section>
            </div>
        </>
    );
}