"use client";

import { usePathname } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

export default function QRCodeBlock() {
    const pathname = usePathname();
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUrl(`https://riddick6600.github.io/tropa${pathname}`);
        }
    }, [pathname]);

    if (!url) return null;

    return (
        <div style={{
            padding: '2rem',
            background: 'white',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            marginTop: 'auto', // Push to bottom if in flex container
            marginBottom: '6rem', // Space for sticky player
            borderTop: '1px solid #e2e8f0'
        }}>
            <h3 style={{ color: '#0f172a', fontWeight: 'bold' }}>QR-код этой страницы</h3>
            <div style={{ padding: '10px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                <QRCodeSVG value={url} size={128} />
            </div>
            <p style={{ color: '#64748b', fontSize: '0.8rem', wordBreak: 'break-all', textAlign: 'center' }}>
                {url}
            </p>
        </div>
    );
}
