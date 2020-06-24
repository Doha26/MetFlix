import React from 'react';
import List from '~/components/common/list/List';
import Loading from '~/components/common/Loading';
import PopularMovieItem from './PopularMovieItem';
import {MovieType} from '~/types/Movie';
import useFetch from "~/hooks/use-fetch";
import {THEMOVIEDB_QUERY_TYPE} from "~/constants";
import {GestureResponderEvent} from "react-native";

const PopularMovieList = ({onLongPress}: { onLongPress: (event:GestureResponderEvent) => void }) => {

    const {response, loading} = useFetch({path: THEMOVIEDB_QUERY_TYPE.POPULAR_MOVIES});
    // @ts-ignore
    const {results: data} = response || {};

    return (loading
            ? <Loading/>
            : (
                <List
                    horizontal={true}
                    data={data}
                    title="Popular Movies"
                    onViewAllPress={() => {
                    }}
                    keyExtractor={({id}: { id: string }) => String(id)}
                    subtitle="Most popular movies in the world"
                    renderItem={({item}: { item: MovieType }) => <PopularMovieItem movie={item} onLongPress={onLongPress}/>}
                />
            )
    );
};

export default PopularMovieList;
