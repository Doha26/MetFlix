import React, {useEffect, useState} from 'react';
import Container from '~/components/common/Container';
import {ActivityIndicator, Platform, TouchableOpacity, View} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';
import Poster from '~/screens/Home/components/poster/Poster';
import PopularMovieList from '~/screens/Home/components/popular-movies/PopularMovieList';
import PopularTvList from '~/screens/Home/components/popular-tv/PopularTvList';
import FamilyList from '~/screens/Home/components/family/FamilyList';
import Colors from '~/theming/colors';
import Text from '~/components/common/Text';
import DocumentaryList from '~/screens/Home/components/documentary/DocumentaryList';
import SearchResults from "~/screens/Home/components/search-results";
import {useDispatch, useSelector} from "react-redux";
import {cancelSearch, search} from '~/actions/search-action/index'
import StatusBar from "~/components/common/StatusBar";
import styles from "~/screens/Home/styles";
import {useHeaderHeight} from "react-navigation-stack";

const {searchStats, countResultTitle} = styles;

const Home = ({navigation}: { navigation: NavigationScreenProp<any> }) => {

    // Get the dispatcher
    const dispatch = useDispatch();

    const headerHeight = useHeaderHeight(); // Get the Header height for custom styling

    // State initialisation
    const [query, setQuery] = useState('');
    const [pendingSearch, setPendingSearch] = useState(false);

    // Geting value from reux store to handle conditional rendering
    const {searching, has_results, search_results} = useSelector(({searchReducer}) => searchReducer);


    useEffect(() => {

    }, []);

    /* This method is triggered once user start typing on the search box */
    const performSearch = (value: string) => {

        if (value != '') {  // if the input value is not empty

            // notify the component to display loader by updating the state value
            setPendingSearch(true);
            setQuery(value);

            // dispatch action that will perform remote request
            dispatch(search(value))

        } else {
            setPendingSearch(false);
            setQuery('');
            dispatch(cancelSearch())  // notify the reducer wether searching should stop
        }
    };

    /* this method allows to performs acton when it comes to cancel seaarching */
    const cancelQuery = () => {
        if (query == '') {
            setPendingSearch(false);
            setQuery('');
            dispatch(cancelSearch())
        }
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
        <SearchResults navigation={navigation}/>
    );

    const noResultContent = (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text small style={{
                fontWeight: 'bold',
                color: Colors.white, marginVertical: 30
            }}>No result found</Text>
        </View>
    );

    return (
        <>
            <View style={{
                paddingHorizontal: 10,
                paddingBottom: 20,
                paddingVertical: 10,
                backgroundColor: Colors.black,
                paddingTop: Platform.select({ios:headerHeight,android:50}),
                justifyContent: 'flex-end'
            }}>
                <StatusBar/>
                <SearchBar
                    onClear={cancelQuery}
                    style={{alignSelf: 'stretch'}}
                    inputContainerStyle={{height: 37,}}
                    containerStyle={{borderRadius: 10, marginHorizontal: 10,}}
                    placeholder="Discover"
                    onChangeText={(value: string) => performSearch(value)}
                    value={query}
                />
                {pendingSearch ? (
                    <View style={searchStats}>
                        <Text numberOfLines={2} small style={countResultTitle}>
                            {search_results?.length} items found
                        </Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={cancelQuery}>
                            <Icon type={'antdesign'} size={26} color={Colors.lightGrey}
                                  name={'close'}/>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
            <Container>
                {searching ? (
                    has_results ? resultContent :
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator
                                color={Colors.white}
                                style={{marginVertical: 30}}
                                size={Platform.OS === 'ios' ? 1 : 24}
                            /></View>
                ) : (
                    pendingSearch ?
                        has_results ? resultContent : noResultContent
                        : null
                )}
                {!pendingSearch ? homeContent : resultContent}
            </Container>
        </>
    );
};

export default Home;
