import React from 'react';
import List from '~/components/common/list/List';
import Loading from '~/components/common/Loading';
import {MovieType} from '~/types/Movie';
import DocumentaryItem from '~/screens/Home/components/documentary/DocumentaryItem';
import useFetch from "~/hooks/use-fetch";
import {QueryResponse} from "~/types/QueryResponse";
import {THEMOVIEDB_QUERY_TYPE} from "~/constants";
import {GestureResponderEvent} from "react-native";

const DocumentaryList = ({onLongPress}: { onLongPress: (event: GestureResponderEvent, movieItem: MovieType) => void }) => {

    const documentary_genres_movies: any = [], documentary_flag = 'documentary';

    //const loading = false;
    const {response, loading} = useFetch({path: THEMOVIEDB_QUERY_TYPE.POPULAR_MOVIES});
    // @ts-ignore
    const {results: data} = response || {};

    // In order to search genres family , first get the list of genres
    const genres_response: QueryResponse = useFetch({path: THEMOVIEDB_QUERY_TYPE.GENRES});
    const genres = genres_response?.response?.genres;

    // Once having the list genres , filter the result to obtain the family genre object
    const documentary_genre = genres?.find((genre: any) => genre.name.toLowerCase() == documentary_flag);

    // filter all movies to obtain only those who include the family genre
    data?.forEach((element: any) => {
        if (element?.genre_ids?.includes(documentary_genre?.id)) {
            documentary_genres_movies.push(element); // push the result in an array
        }
    });

    return (loading
            ? <Loading/>
            : (
                <List
                    horizontal={true}
                    data={documentary_genres_movies}
                    title="Documentary"
                    onViewAllPress={() => console.log(1)}
                    keyExtractor={({id}: { id: string }) => String(id)}
                    subtitle="Documentary you will like"
                    renderItem={({item}: { item: MovieType }) => <DocumentaryItem movie={item}
                                                                                  onLongPress={onLongPress}/>}
                />
            )
    );
};

export default DocumentaryList;
