import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

/**
 * Fetches live crowd data from Firestore with fallback handling.
 */
export const getCrowdData = async () => {
    // Default fallback data
    const fallbackData = {
        percentage: 68,
        gate: "Gate 44",
        waitTime: "10 mins"
    };

    if (!db) {
        return fallbackData;
    }

    try {
        const docRef = doc(db, "liveCrowd", "stadiumMain");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        }
        return fallbackData;
    } catch (error) {
        console.error("Error fetching crowd data:", error);
        return fallbackData;
    }
};
