import { useState, useEffect } from 'react';

/**
 * Hook to manage a countdown timer.
 * @param {Object} initialTime - { h, m, s }
 */
export const useCountdownTimer = (initialTime = { h: 2, m: 44, s: 46 }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.s > 0) return { ...prev, s: prev.s - 1 };
                if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
                if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return timeLeft;
};
