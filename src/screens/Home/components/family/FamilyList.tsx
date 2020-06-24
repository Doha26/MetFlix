import React from 'react';
import List from '~/components/common/list/List';
import Loading from '~/components/common/Loading';
import {MovieType} from '~/types/Movie';
import FamilyItem from '~/screens/Home/components/family/FamilyItem';
import useFetch from "~/hooks/use-fetch";
import {QueryResponse} from "~/types/QueryResponse";
import {THEMOVIEDB_QUERY_TYPE} from "~/constants";
import {GestureResponderEvent} from "react-native";

const FamilyList = ({onLongPress}:{onLongPress:(event: GestureResponderEvent, movieItem: MovieType)=>void}) => {

    const family_genres_movies: any = [], family_flag = 'family';

    //const loading = false;
    const {response, loading} = useFetch({path: THEMOVIEDB_QUERY_TYPE.POPULAR_MOVIES});
    // @ts-ignore
    const {results: data} = response || {};

    // In order to search genres family , first get the list of genres
    const genres_response: QueryResponse = useFetch({path: THEMOVIEDB_QUERY_TYPE.GENRES});
    const genres = genres_response?.response?.genres;

    // Once having the list genres , filter the result to obtain the family genre object
    const family_genre = genres?.find((genre: any) => genre.name.toLowerCase() == family_flag);

    // filter all movies to obtain only those who include the family genre
    data?.forEach((element: any) => {
        if (element?.genre_ids?.includes(family_genre?.id)) {
            family_genres_movies.push(element); // push the result in an array
        }
    });
    return (loading
            ? <Loading/>
            : (
                <List
                    horizontal={true}
                    data={family_genres_movies}
                    title="Family"
                    onViewAllPress={() => {
                    }}
                    keyExtractor={({id}: { id: string }) => String(id)}
                    subtitle="Enjoy tv with your family"
                    renderItem={({item}: { item: MovieType }) => <FamilyItem movie={item} onLongPress={onLongPress}/>}
                />
            )
    );
};

export default FamilyList;
