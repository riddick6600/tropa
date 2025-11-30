"use client";

import React, { createContext, useCallback, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface HistoryItem {
    id: number;
    message: string;
    points: number;
    timestamp: number;
    actionHash: string; // Хеш события для отслеживания
}

interface UserData {
    name: string;
    points: number;
    visitedPlaces: string[]; // Оставляем для обратной совместимости
    completedRoutes: string[];
    readArticles: string[];
    listenedAudio: string[];
    completedActions: string[]; // Новый массив хешей всех выполненных действий
    history: HistoryItem[];
}

const INITIAL_DATA: UserData = {
    name: '',
    points: 0,
    visitedPlaces: [],
    completedRoutes: [],
    readArticles: [],
    listenedAudio: [],
    completedActions: [],
    history: [],
};

interface ToastMessage {
    id: number;
    message: string;
    points?: number;
}

export interface Rank {
    title: string;
    minPoints: number;
    color: string;
    icon: string;
}

export const RANKS: Rank[] = [
    { title: 'Турист', minPoints: 0, color: '#94a3b8', icon: '🎒' },
    { title: 'Путешественник', minPoints: 100, color: '#60a5fa', icon: '🥾' },
    { title: 'Исследователь', minPoints: 300, color: '#a78bfa', icon: '🧭' },
    { title: 'Археолог', minPoints: 500, color: '#f59e0b', icon: '🔍' },
    { title: 'Хранитель наследия', minPoints: 800, color: '#d4af37', icon: '👑' },
];

export function getRank(points: number): Rank {
    // Найти наивысшее звание, для которого у пользователя достаточно баллов
    for (let i = RANKS.length - 1; i >= 0; i--) {
        if (points >= RANKS[i].minPoints) {
            return RANKS[i];
        }
    }
    return RANKS[0]; // По умолчанию - Турист
}

interface GamificationContextType {
    userData: UserData;
    setName: (name: string) => void;
    addPoints: (amount: number, reason: string, actionHash?: string) => void;
    visitPlace: (placeId: string) => void;
    completeRoute: (routeId: string) => void;
    readArticle: (articleId: string) => void;
    listenAudio: (audioId: string) => void;
    showToast: (message: string, points?: number) => void;
    toasts: ToastMessage[];
    getRank: (points: number) => Rank;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
    const [userData, setUserData, isInitialized] = useLocalStorage<UserData>('heritage_user_data', INITIAL_DATA);
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const showToast = useCallback((message: string, points?: number) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, points }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const addPoints = useCallback((amount: number, reason: string, actionHash: string = '') => {
        setUserData((prev) => {
            const newHistoryItem: HistoryItem = {
                id: Date.now(),
                message: reason,
                points: amount,
                timestamp: Date.now(),
                actionHash
            };
            return {
                ...prev,
                points: prev.points + amount,
                history: [newHistoryItem, ...prev.history]
            };
        });
        showToast(reason, amount);
    }, [setUserData, showToast]);

    const setName = useCallback((name: string) => {
        setUserData((prev) => ({ ...prev, name }));
    }, [setUserData]);

    /**
     * Универсальная функция для записи действия с проверкой дубликатов
     * @param actionType - тип действия (visit, route, article, audio)
     * @param itemId - ID элемента
     * @param points - количество баллов
     * @param message - сообщение для пользователя
     */
    const recordAction = useCallback((
        actionType: 'visit' | 'route' | 'article' | 'audio',
        itemId: string,
        points: number,
        message: string
    ) => {
        const actionHash = `${actionType}:${itemId}`;

        // Проверяем, было ли уже выполнено это действие
        if (userData.completedActions.includes(actionHash)) {
            return; // Действие уже выполнено, баллы не начисляем
        }

        let updated = false;
        setUserData((prev) => {
            // Двойная проверка внутри setState для предотвращения race conditions
            if (prev.completedActions.includes(actionHash)) {
                return prev;
            }

            updated = true;
            const newData = {
                ...prev,
                completedActions: [...prev.completedActions, actionHash]
            };

            // Обновляем соответствующий массив для обратной совместимости
            switch (actionType) {
                case 'visit':
                    if (!prev.visitedPlaces.includes(itemId)) {
                        newData.visitedPlaces = [...prev.visitedPlaces, itemId];
                    }
                    break;
                case 'route':
                    if (!prev.completedRoutes.includes(itemId)) {
                        newData.completedRoutes = [...prev.completedRoutes, itemId];
                    }
                    break;
                case 'article':
                    if (!prev.readArticles.includes(itemId)) {
                        newData.readArticles = [...prev.readArticles, itemId];
                    }
                    break;
                case 'audio':
                    if (!prev.listenedAudio.includes(itemId)) {
                        newData.listenedAudio = [...prev.listenedAudio, itemId];
                    }
                    break;
            }

            return newData;
        });

        if (updated) {
            addPoints(points, message, actionHash);
        }
    }, [userData.completedActions, setUserData, addPoints]);

    const visitPlace = useCallback((placeId: string) => {
        recordAction('visit', placeId, 100, 'Вы посетили новое место!');
    }, [recordAction]);

    const completeRoute = useCallback((routeId: string) => {
        recordAction('route', routeId, 100, 'Маршрут пройден!');
    }, [recordAction]);

    const readArticle = useCallback((articleId: string) => {
        recordAction('article', articleId, 25, 'Статья прочитана');
    }, [recordAction]);

    const listenAudio = useCallback((audioId: string) => {
        recordAction('audio', audioId, 50, 'Аудиогид прослушан');
    }, [recordAction]);

    if (!isInitialized) {
        return null;
    }

    return (
        <GamificationContext.Provider value={{
            userData,
            setName,
            addPoints,
            visitPlace,
            completeRoute,
            readArticle,
            listenAudio,
            showToast,
            toasts,
            getRank
        }}>
            {children}
        </GamificationContext.Provider>
    );
}

export function useGamification() {
    const context = useContext(GamificationContext);
    if (context === undefined) {
        throw new Error('useGamification must be used within a GamificationProvider');
    }
    return context;
}
