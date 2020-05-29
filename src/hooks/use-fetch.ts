import {useEffect, useState} from 'react';
import api from '~/services/index';
import {THEMOVIEDB_API_KEY} from "~/constants";

export const useFetch  = ({path}: { path: string }) => {

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = {
            api_key: THEMOVIEDB_API_KEY,
        };

        api.get(path, {params})
            .then(({data}) => {
                setResponse(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    return {loading, response};
};

export default useFetch;
