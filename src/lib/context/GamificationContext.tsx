"use client";

import React, { createContext, useCallback, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface UserData {
    name: string;
    points: number;
    visitedPlaces: string[];
    completedRoutes: string[];
    readArticles: string[];
    listenedAudio: string[];
}

const INITIAL_DATA: UserData = {
    name: '',
    points: 0,
    visitedPlaces: [],
    completedRoutes: [],
    readArticles: [],
    listenedAudio: [],
};

interface ToastMessage {
    id: number;
    message: string;
    points?: number;
}

interface GamificationContextType {
    userData: UserData;
    setName: (name: string) => void;
    addPoints: (amount: number, reason: string) => void;
    visitPlace: (placeId: string) => void;
    completeRoute: (routeId: string) => void;
    readArticle: (articleId: string) => void;
    listenAudio: (audioId: string) => void;
    showToast: (message: string, points?: number) => void;
    toasts: ToastMessage[];
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

    const addPoints = useCallback((amount: number, reason: string) => {
        setUserData((prev) => ({ ...prev, points: prev.points + amount }));
        showToast(reason, amount);
    }, [setUserData, showToast]);

    const setName = useCallback((name: string) => {
        setUserData((prev) => ({ ...prev, name }));
    }, [setUserData]);

    const visitPlace = useCallback((placeId: string) => {
        // The outer check uses the current `userData` from the closure.
        // This callback will re-create if `userData.visitedPlaces` changes,
        // ensuring `userData.visitedPlaces` is up-to-date for this check.
        if (!userData.visitedPlaces.includes(placeId)) {
            let updated = false;
            setUserData((prev) => {
                // The inner check uses the `prev` state, ensuring atomicity
                // in case of rapid calls or concurrent updates.
                if (prev.visitedPlaces.includes(placeId)) {
                    return prev;
                }
                updated = true; // Mark that an update occurred
                return { ...prev, visitedPlaces: [...prev.visitedPlaces, placeId] };
            });
            // Only call addPoints if the state was actually updated
            if (updated) {
                addPoints(100, 'Вы посетили новое место!');
            }
        }
    }, [userData.visitedPlaces, setUserData, addPoints]); // Re-create if visitedPlaces changes to get fresh `userData.visitedPlaces`

    const completeRoute = useCallback((routeId: string) => {
        if (!userData.completedRoutes.includes(routeId)) {
            let updated = false;
            setUserData((prev) => {
                if (prev.completedRoutes.includes(routeId)) {
                    return prev;
                }
                updated = true;
                return { ...prev, completedRoutes: [...prev.completedRoutes, routeId] };
            });
            if (updated) {
                addPoints(100, 'Маршрут пройден!');
            }
        }
    }, [userData.completedRoutes, setUserData, addPoints]);

    const readArticle = useCallback((articleId: string) => {
        if (!userData.readArticles.includes(articleId)) {
            let updated = false;
            setUserData((prev) => {
                if (prev.readArticles.includes(articleId)) {
                    return prev;
                }
                updated = true;
                return { ...prev, readArticles: [...prev.readArticles, articleId] };
            });
            if (updated) {
                addPoints(25, 'Статья прочитана');
            }
        }
    }, [userData.readArticles, setUserData, addPoints]);

    const listenAudio = useCallback((audioId: string) => {
        if (!userData.listenedAudio.includes(audioId)) {
            let updated = false;
            setUserData((prev) => {
                if (prev.listenedAudio.includes(audioId)) {
                    return prev;
                }
                updated = true;
                return { ...prev, listenedAudio: [...prev.listenedAudio, audioId] };
            });
            if (updated) {
                addPoints(50, 'Аудиогид прослушан');
            }
        }
    }, [userData.listenedAudio, setUserData, addPoints]);

    // Prevent hydration mismatch by not rendering until initialized
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
            toasts
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
