import React, {useState} from 'react';
import Container from '~/components/common/Container';
import {View} from 'react-native';
import StatusBar from '~/components/common/StatusBar';
import {SearchBar} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';
import Poster from '~/screens/Home/components/Poster';
import {IMovie} from '~/types/Movie';

const Home = ({navigation}: {navigation: NavigationScreenProp<any>}) => {
  const [search, setSearch] = useState('');

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  const sampleMovie: IMovie = {
    id:"xdtplkjg-oikjhgd",
    title:"Titre",
    posterPath:require('~/assets/images/poster.jpeg'),
    releaseDate:"20-40-2009",
    description:"Just an amazing movie"
  };

  return (
    <Container>
      <StatusBar/>
      <View style={{marginTop: 20}}>
        <SearchBar
          inputContainerStyle={{height: 37}}
          containerStyle={{borderRadius: 10, borderWidth: 1, marginHorizontal:10}}
          placeholder="Discover"
          onChangeText={updateSearch}
          value={search}/>
          <Poster movie={sampleMovie}/>
      </View>
    </Container>
  );
};

export default Home;
