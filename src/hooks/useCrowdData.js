import { useState, useEffect } from 'react';
import { getCrowdData } from '../services/firebaseService';

/**
 * Hook to manage live crowd data fetching and state.
 */
export const useCrowdData = () => {
    const [crowdData, setCrowdData] = useState({
        percentage: 68,
        gate: "Gate 44",
        waitTime: "10 mins"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getCrowdData();
                if (isMounted) {
                    setCrowdData(data);
                }
            } catch (error) {
                console.error("useCrowdData error:", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => { isMounted = false; };
    }, []);

    return { crowdData, loading };
};
