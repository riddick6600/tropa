'use client';

import { useGamification } from '@/lib/context/GamificationContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from './Icon';

interface HeaderProps {
    title: string;
    showBack?: boolean;
    showProfile?: boolean;
}

/**
 * Header компонент для навигации
 * Отображается на всех страницах кроме главной
 */
export const Header: React.FC<HeaderProps> = ({ title, showBack = true, showProfile = true }) => {
    const router = useRouter();
    const { userData } = useGamification();

    return (
        <header style={{
            background: 'var(--card)',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
            }}>
                {showBack && (
                    <button
                        onClick={() => router.back()}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            color: 'var(--foreground)'
                        }}
                        aria-label="Назад"
                    >
                        <Icon name="arrow-left" size={20} />
                    </button>
                )}
                <h1 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    flex: 1,
                    textAlign: showBack ? 'left' : 'center',
                    margin: 0
                }}>
                    {title}
                </h1>
                {showProfile && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        {userData.name && (
                            <Link
                                href="/profile"
                                style={{
                                    textDecoration: 'none',
                                    color: 'var(--foreground)',
                                    fontWeight: '500',
                                    fontSize: '0.95rem',
                                    display: 'none'
                                }}
                                className="show-on-desktop"
                            >
                                {userData.name}
                            </Link>
                        )}
                        <Link
                            href="/profile"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textDecoration: 'none',
                                color: 'var(--primary)',
                                cursor: 'pointer',
                                padding: '8px 12px',
                                borderRadius: 'var(--radius)',
                                transition: 'background 0.2s',
                                background: 'rgba(212, 175, 55, 0.1)',
                                border: '1px solid var(--primary)',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                minWidth: '50px'
                            }}
                        >
                            {userData.points}
                        </Link>
                    </div>
                )}
            </div>
            <style jsx>{`
                @media (min-width: 640px) {
                    .show-on-desktop {
                        display: inline-block !important;
                    }
                }
            `}</style>
        </header>
    );
};
