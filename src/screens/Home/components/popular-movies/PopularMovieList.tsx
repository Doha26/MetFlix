import React from 'react';
import List from '~/components/common/list/List';
import Loading from '~/components/common/Loading';
import PopularMovieItem from './PopularMovieItem';
import {MovieType} from '~/types/Movie';
import useFetch from "~/hooks/use-fetch";
import {THEMOVIEDB_QUERY_TYPE} from "~/constants";

const PopularMovieList = () => {

  const { response, loading } = useFetch({ path: THEMOVIEDB_QUERY_TYPE.POPULAR_MOVIES });
  const { results: data } = response || {};

  return (loading
      ? <Loading/>
      : (
        <List
            theme={null}
            horizontal={true}
          data={data}
          title="Popular Movies"
          onViewAllPress={() => {}}
          keyExtractor={({id}: {id: string}) => String(id)}
          subtitle="Most popular movies in the world"
          renderItem={({item}: {item: MovieType}) => <PopularMovieItem movie={item}/>}
        />
      )
  );
};

export default PopularMovieList;
