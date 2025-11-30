'use client';

import { useRouter } from 'next/navigation';
import { Icon } from './Icon';

interface HeaderProps {
    title: string;
    showBack?: boolean;
}

/**
 * Header компонент для навигации
 * Отображается на всех страницах кроме главной
 */
export const Header: React.FC<HeaderProps> = ({ title, showBack = true }) => {
    const router = useRouter();

    return (
        <header style={{
            background: 'var(--card)',
            borderBottom: '1px solid var(--border)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            position: 'sticky',
            top: 0,
            zIndex: 100
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
        </header>
    );
};
