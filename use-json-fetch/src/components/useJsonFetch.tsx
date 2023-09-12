import { useState, useEffect } from 'react'

const useJsonFetch = (url: string, opts: RequestInit = {})
    : [any, boolean, Error | null] => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError]= useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(url, opts);
                if (!response.ok) { 
                    throw new Error(`HTTP error, status: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (er: any) {
                setError(er);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
  return [data, loading, error];
}

export default useJsonFetch;