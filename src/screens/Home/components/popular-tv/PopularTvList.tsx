import React from 'react';
import List from '~/components/common/list/List';
import Loading from '~/components/common/Loading';
import {MovieType} from '~/types/Movie';
import PopularTvItem from './PopularTvItem';

const PopularTvList = () => {
  const loading: boolean = false;

  const movies = [
    {
      id: 'xdtplkjg-oikjhgd',
      title: 'Titre',
      posterPath: require('~/assets/images/poster.jpeg'),
      releaseDate: '20-40-2009',
      description: 'Just an amazing movie',
    },
    {
      id: 'xdtplkjg-ossxjhgd',
      title: 'Titre2',
      posterPath: require('~/assets/images/poster.jpeg'),
      releaseDate: '20-40-2009',
      description: 'Just an amazing movie2',
    },
    {
      id: 'xdtpWEDSFRlkjg-oikjhgd',
      title: 'Titre3',
      posterPath: require('~/assets/images/poster.jpeg'),
      releaseDate: '20-40-2009',
      description: 'Just an amazing movie3',
    },
    {
      id: 'xwwwdtplkjg-oikjhgd',
      title: 'Titre4',
      posterPath: require('~/assets/images/poster.jpeg'),
      releaseDate: '20-40-2009',
      description: 'Just an amazing movie4',
    },
    {
      id: 'xdtpxsssslkjg-ossxjhgd',
      title: 'Titre5',
      posterPath: require('~/assets/images/poster.jpeg'),
      releaseDate: '20-40-2009',
      description: 'Just an amazing movie5',
    },
    {
      id: 'xdtpWEDSFRlkjg-oikjhgdderrrrr',
      title: 'Titre6',
      posterPath: require('~/assets/images/poster.jpeg'),
      releaseDate: '20-40-2009',
      description: 'Just an amazing movie6',
    },
  ];

  return (loading
      ? <Loading/>
      : (
        <List
          data={movies}
          title="Popular tv series"
          onViewAllPress={() => {}}
          keyExtractor={({id}: {id: string}) => String(id)}
          subtitle="Most popular tv series in the world"
          renderItem={({item}: {item: MovieType}) => <PopularTvItem movie={item}/>}
        />
      )
  );
};

export default PopularTvList;
