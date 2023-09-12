import React from 'react'
import useJsonFetch from './useJsonFetch'

//type Props = { endpoint: string}
const SLOAD = 'http://localhost:7070/loading';
const SERROR = 'http://localhost:7070/error';
const SDATA = 'http://localhost:7070/data';


const VerifyComponent: React.FC = () => {
    const [data, loading, error] = useJsonFetch(SLOAD);
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }

    return (
        <div>Data: {JSON.stringify(data)}</div>
        //<Component {...data} />
    )
}

export default VerifyComponent;