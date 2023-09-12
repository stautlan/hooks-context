import React from 'react'
import useJsonFetch from './useJsonFetch';

const withVerify = (Component: React.ComponentType, endpoint: string) => {
    const Verify: React.FC = () => {
        const [data, loading, error] = useJsonFetch(endpoint);
        if (!loading) {
            return <div>Loading...</div>
        }
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        }

        return (
            // <div>Data: {JSON.stringify(data)}</div>
            <Component {...data} />
        )
    }
}

export default withVerify;