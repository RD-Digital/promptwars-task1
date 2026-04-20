import { safeNumber } from './safe';

/**
 * Formats time by padding single digits with 0.
 */
export const formatTime = (timeInMinutes) => {
    const mins = safeNumber(timeInMinutes);
    return `${mins} min`;
};

/**
 * Formats a number to a percentage string.
 */
export const formatPercentage = (value) => {
    const num = safeNumber(value);
    return `${num}%`;
};
