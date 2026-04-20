/**
 * Safely access number values. Returns 0 if invalid.
 */
export const safeNumber = (val) => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
};

/**
 * Safely access string values. Returns fallback if invalid.
 */
export const safeString = (val, fallback = '') => {
    if (val === null || val === undefined) return fallback;
    return String(val);
};
