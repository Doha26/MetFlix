import React, {useState} from 'react';
import {SafeAreaProvider} from "react-native-safe-area-context";
import Container from '~/components/common/Container';
import {ActivityIndicator, Platform, View} from 'react-native';
import StatusBar from '~/components/common/StatusBar';
import {SearchBar} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';
import Poster from '~/screens/Home/components/Poster';
import PopularMovieList from '~/screens/Home/components/popular-movies/PopularMovieList';
import PopularTvList from '~/screens/Home/components/popular-tv/PopularTvList';
import FamilyList from '~/screens/Home/components/family/FamilyList';
import Colors from '~/theming/colors';
import Text from '~/components/common/Text';
import DocumentaryList from '~/screens/Home/components/documentary/DocumentaryList';
import SearchResults from "~/screens/Home/components/search-results";
import {useDispatch, useSelector} from "react-redux";
import {cancelSearch, search} from '~/actions/search-action/index'

const Home = ({navigation}: { navigation: NavigationScreenProp<any> }) => {

    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [pendingSearch, setPendingSearch] = useState(false);

    const {searching, has_results} = useSelector(({searchReducer}) => searchReducer);

    const performSearch = (value: string) => {
        setPendingSearch(true);
        if (value != '') {
            setQuery(value);
            dispatch(search(value))
        } else {
            setPendingSearch(false);
            setQuery('');
            dispatch(cancelSearch())
        }
    };

    const cancelQuery = () => {
        setPendingSearch(false);
        setQuery('');
        dispatch(cancelSearch())
    };

    const homeContent = (
        <View style={{marginTop: 20}}>
            <Poster/>
            <PopularMovieList/>
            <PopularTvList/>
            <FamilyList/>
            <DocumentaryList/>
        </View>
    );

    const resultContent = (
        <SearchResults query={search} navigation={navigation}/>
    );

    const noResultContent = (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text small style={{fontWeight: 'bold', color: Colors.white,marginVertical:30}}>No result found</Text>
        </View>
    );

    return (
        <SafeAreaProvider>
            <StatusBar/>
            <Container>
                <SearchBar
                    showLoading={searching}
                    onClear={cancelQuery}
                    onBlur={cancelQuery}
                    inputContainerStyle={{height: 37}}
                    containerStyle={{borderRadius: 10, marginTop: 20, borderWidth: 1, marginHorizontal: 10}}
                    placeholder="Discover"
                    onChangeText={(value: string) => performSearch(value)}
                    value={query}
                />
                {searching ? (
                    has_results ? resultContent :
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator
                                color={Colors.white}
                                style={{marginVertical:30}}
                                size={Platform.OS === 'ios' ? 1 : 24}
                            /></View>
                ) : (
                    pendingSearch ?
                        has_results ? resultContent : noResultContent
                        : null
                )}
                {!pendingSearch ? homeContent : null}
            </Container>
        </SafeAreaProvider>
    );
};

export default Home;
