import React, {useState} from 'react';
import {SafeAreaProvider} from "react-native-safe-area-context";
import Container from '~/components/common/Container';
import {View} from 'react-native';
import StatusBar from '~/components/common/StatusBar';
import {SearchBar} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';
import Poster from '~/screens/Home/components/Poster';
import {MovieType} from '~/types/Movie';
import PopularMovieList from '~/screens/Home/components/popular-movies/PopularMovieList';
import PopularTvList from '~/screens/Home/components/popular-tv/PopularTvList';
import FamilyList from '~/screens/Home/components/family/FamilyList';
import DocumentaryList from '~/screens/Home/components/documentary/DocumentaryList';


const Home = ({navigation}: { navigation: NavigationScreenProp<any> }) => {
    const [search, setSearch] = useState('');

    const updateSearch = (search: string) => {
        setSearch(search);
    };
    return (
        <SafeAreaProvider>
            <Container>
                <StatusBar/>
                <View style={{marginTop: 20}}>
                    <SearchBar
                        inputContainerStyle={{height: 37}}
                        containerStyle={{borderRadius: 10, borderWidth: 1, marginHorizontal: 10}}
                        placeholder="Discover"
                        onChangeText={updateSearch}
                        value={search}/>
                    <Poster/>
                    <PopularMovieList/>
                    <PopularTvList/>
                    <FamilyList/>
                    <DocumentaryList/>
                </View>
            </Container>
        </SafeAreaProvider>
    );
};

export default Home;
