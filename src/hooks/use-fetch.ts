import {useEffect, useState} from 'react';
import api from '~/services/index';
import {THEMOVIEDB_API_KEY} from "~/constants";

export const useFetch = ({path}: { path: string }) => {

    // Initial state
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const params = {
            api_key: THEMOVIEDB_API_KEY, // set the API_KEY since we use a protected ressources
        };

        // Execute axios get method to perform query
        api.get(path, {params})
            .then(({data}) => {
                setResponse(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);
    // destructuring an return an object tht conatin the response
    return {loading, response};
};

export default useFetch;
