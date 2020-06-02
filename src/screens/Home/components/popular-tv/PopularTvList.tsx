import React from 'react';
import List from '~/components/common/list/List';
import Loading from '~/components/common/Loading';
import {MovieType} from '~/types/Movie';
import PopularTvItem from './PopularTvItem';
import useFetch from "~/hooks/use-fetch";
import {THEMOVIEDB_QUERY_TYPE} from "~/constants";

const PopularTvList = () => {

    const {response, loading} = useFetch({path: THEMOVIEDB_QUERY_TYPE.POPULAR_TV});

    // @ts-ignore
    const {results: data} = response || {};

    return (loading
            ? <Loading/>
            : (
                <List
                    horizontal={true}
                    data={data}
                    title="Popular tv series"
                    onViewAllPress={() => {
                    }}
                    keyExtractor={({id}: { id: string }) => String(id)}
                    subtitle="Most popular tv series in the world"
                    renderItem={({item}: { item: MovieType }) => <PopularTvItem movie={item}/>}
                />
            )
    );
};

export default PopularTvList;
