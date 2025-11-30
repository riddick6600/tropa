"use client";

import { useGamification } from '@/lib/context/GamificationContext';
import styles from './Toast.module.css';

export default function ToastContainer() {
    const { toasts } = useGamification();

    if (toasts.length === 0) return null;

    return (
        <div className={styles.container}>
            {toasts.map((toast) => (
                <div key={toast.id} className={styles.toast}>
                    <div className={styles.content}>
                        <span className={styles.message}>{toast.message}</span>
                        {toast.points && (
                            <span className={styles.points}>+{toast.points} баллов</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
