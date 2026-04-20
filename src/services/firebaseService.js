import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { logEvent } from "firebase/analytics";
import { db, auth, getAnalyticsInstance } from "../lib/firebase";

// Generate unique session ID for linking logs
const sessionId = Date.now() + "_" + Math.random().toString(36).slice(2);
let cachedCrowdPercentage = 68; // fallback caching for analytics

/**
 * Fetches live crowd data from Firestore with fallback handling.
 */
export const getCrowdData = async () => {
    const fallbackData = { percentage: 68, gate: "Gate 44", waitTime: "10 mins" };
    if (!db) return fallbackData;

    try {
        const docRef = doc(db, "liveCrowd", "stadiumMain");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.percentage) cachedCrowdPercentage = data.percentage;
            return data;
        }
        return fallbackData;
    } catch (error) {
        console.error("Error fetching crowd data:", error);
        return fallbackData;
    }
};

/**
 * Logs user events to Firebase Analytics and optionally fires a dynamic write to Firestore.
 */
export const logUserEvent = async (eventName, params = {}) => {
    // Cross-Service Linking:
    const userEmail = auth?.currentUser?.email || "guest";
    
    // 1. Firebase Analytics
    const analytics = getAnalyticsInstance();
    if (analytics) {
        try {
            logEvent(analytics, eventName, {
                timestamp: Date.now(),
                sessionId,
                user: userEmail,
                crowd_level: params.crowd_level || cachedCrowdPercentage,
                ...params
            });
        } catch (err) {
            console.warn("Error logging analytics event", err);
        }
    }

    // 2. Dynamic Writes (Firestore) for major interactions
    if (eventName === 'user_interaction' || eventName === 'map_interaction' || eventName === 'app_load') {
        logDynamicWrite(eventName, params);
    }
};

/**
 * Writes dynamic logs to Firestore userLogs collection safely.
 */
export const logDynamicWrite = async (action, metadata = {}) => {
    if (!db) return;
    const userEmail = auth?.currentUser?.email || "guest";

    try {
        await addDoc(collection(db, "userLogs"), {
            timestamp: Date.now(),
            action: action,
            screen: metadata.screen || metadata.firebase_screen || 'unknown',
            user: userEmail,
            sessionId,
            crowd: metadata.crowd_perc || cachedCrowdPercentage,
            metadata: metadata
        });
    } catch (err) {
        console.warn("Failed to write to userLogs", err);
    }
};
