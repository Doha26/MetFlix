import React, {useState} from 'react';
import Container from '~/components/common/Container';
import {
    ActivityIndicator,
    GestureResponderEvent,
    Platform, TouchableOpacity,
    View
} from 'react-native';
import {Divider, ListItem, SearchBar} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import Poster from '~/screens/Home/components/poster/Poster';
import PopularMovieList from '~/screens/Home/components/popular-movies/PopularMovieList';
import PopularTvList from '~/screens/Home/components/popular-tv/PopularTvList';
import FamilyList from '~/screens/Home/components/family/FamilyList';
import Colors from '~/theming/colors';
import Text from '~/components/common/Text';
import DocumentaryList from '~/screens/Home/components/documentary/DocumentaryList';
import SearchResults from "~/screens/Home/components/search-results";
import {useDispatch, useSelector} from "react-redux";
import {cancelSearch, search} from '~/actions/search-actions/index'
import StatusBar from "~/components/common/StatusBar";
import styles from "~/screens/Home/styles";
import {useHeaderHeight} from "react-navigation-stack";
import {SearchReducerType} from "~/types/SearchReducerType";
import {BlurView} from "@react-native-community/blur";
import {MovieType} from "~/types/Movie";
import PopularMovieItem from "~/screens/Home/components/popular-movies/PopularMovieItem";
import {HEIGHT} from "~/utils/dimensions";
import AuxHOC from "~/container/AuxHOC";
import menuItems from "~/utils/data/menuItems"

const {searchStats, countResultTitle} = styles;

const Home = ({navigation}: { navigation: NavigationScreenProp<any> }) => {

    // Get the dispatcher
    const dispatch = useDispatch();

    // Get the Header height for custom styling
    const headerHeight = useHeaderHeight();

    // State initialisation
    const [query, setQuery] = useState('');
    const [pendingSearch, setPendingSearch] = useState(false);
    const [itemPressed, setItemPressed] = useState(false);

    const defaultMovie: MovieType = {
        id: "",
        video: false,
        title: '',
        original_title: '',
        vote_average: 0,
        poster_path: '',
        release_date: '',
        overview: 'null',
    };
    const [selectedMovie, setSelectedMovie] = useState(defaultMovie);
    const [selectedPositionX, setSelectedPositionX] = useState(0);
    const [selectedPositionY, setSelectedPositionY] = useState(0);
    const [shouldRenderItemTop, setShouldRenderItemTop] = useState(false);


    // Geting value from reux store to handle conditional rendering
    const {searching, has_results, search_results} = useSelector(({searchReducer}: { searchReducer: SearchReducerType }) => searchReducer);


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
    const cancelQuery = (abort: boolean) => {
        if (abort) {
            setPendingSearch(false);
            setQuery('');
            dispatch(cancelSearch())
        } else {
            if (query == '') {
                setPendingSearch(false);
                setQuery('');
                dispatch(cancelSearch())
            }
        }
    };


    // when a movie is long pressed, display blur view
    const onItemPressed = (event: GestureResponderEvent, movieItem: MovieType) => {
        setItemPressed(true);
        setSelectedMovie(movieItem);
        setSelectedPositionX(event.nativeEvent.locationX);

        // this value allows to check wether user clicked on the Half bottom or not
        const offsetY = HEIGHT - event.nativeEvent.pageY;

        if (offsetY < HEIGHT / 2) { // If user press long on the Botom half part of the screen
            setShouldRenderItemTop(true); // Render popup menu with Item on top
            setSelectedPositionY(event.nativeEvent.pageY - 160);
        } else {
            setShouldRenderItemTop(false); // Render popup menu with Item on bottom
            setSelectedPositionY(event.nativeEvent.pageY);
        }
    };

    // Navigate to the detail page when user click on the pressed button
    const handleOnPress = (movieItem: MovieType) => {
        setItemPressed(false);
        navigation.navigate('detail', {'movie': movieItem})
    };

    const homeContent = (
        <View style={{marginTop: 20}}>
            <Poster/>
            <PopularMovieList onLongPress={onItemPressed}/>
            <PopularTvList onLongPress={onItemPressed}/>
            <FamilyList onLongPress={onItemPressed}/>
            <DocumentaryList onLongPress={onItemPressed}/>
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


    /* Call this method to render content if user cliked on the half
    top section of the screen to better display the menu */

    const renderMenuWithItemMovieOnTop = (
        <AuxHOC>
            <PopularMovieItem
                onPress={handleOnPress}
                movie={selectedMovie}
                absoluteItemStyle={styles.absoluteItemStyle}
                absolute={true}/>
            <View style={{backgroundColor: Colors.darkBlue, borderRadius: 10, marginTop: 10, width: 300}}>
                {menuItems.map((item, index) => (
                    <AuxHOC key={item.id}>
                        <ListItem
                            Component={TouchableScale}
                            friction={90}
                            tension={100}
                            activeScale={0.95}
                            key={item.id}
                            rightIcon={{name: item.icon, color: Colors.white}}
                            title={item.title}
                            titleStyle={{color: Colors.white}}
                            containerStyle={{backgroundColor: Colors.transparent}}
                        />
                        {index != menuItems.length - 1 ? (
                                <Divider style={{backgroundColor: Colors.white}}/>)
                            : null}
                    </AuxHOC>
                ))}
            </View>

        </AuxHOC>
    );


    /* Call this method to render content if user cliked on the half
     bottom section of the screen to better display the menu */

    const renderMenuWithItemMovieOnBottom = (
        <>
            <PopularMovieItem
                onPress={handleOnPress}
                movie={selectedMovie}
                absolute={true}
                absoluteItemStyle={{marginTop: 10}}/>

            <View style={styles.absoluteMenuStyle}>
                {menuItems.map((item, index) => (
                    <AuxHOC key={item.id}>
                        <ListItem
                            Component={TouchableScale}
                            friction={90}
                            tension={100}
                            activeScale={0.95}
                            key={item.id}
                            rightIcon={{name: item.icon, color: Colors.white}}
                            title={item.title}
                            titleStyle={{color: Colors.white}}
                            containerStyle={{backgroundColor: Colors.transparent}}
                        />
                        {index != menuItems.length - 1 ? (
                                <Divider style={{backgroundColor: Colors.white}}/>)
                            : null}
                    </AuxHOC>
                ))}
            </View>
        </>
    );

    const renderPopupMenuContent = () => {
        return shouldRenderItemTop ?
            renderMenuWithItemMovieOnTop
            : renderMenuWithItemMovieOnBottom
    };

    return (
        <>
            <View style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                backgroundColor: Colors.black,
                paddingTop: Platform.select({ios: headerHeight - 20, android: 20}),
                justifyContent: 'flex-end'
            }}>
                <StatusBar/>
                <SearchBar
                    onClear={() => cancelQuery(true)}
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
                            {`${search_results?.length} items found`}
                        </Text>
                    </View>
                ) : null}
            </View>
            {Platform.OS === 'ios' && (
                itemPressed ? <BlurView
                    style={{
                        position: 'absolute', top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        zIndex: 900
                    }}
                    blurRadius={10}
                    overlayColor={Colors.white}
                    blurType="light"
                    blurAmount={3}>
                    <TouchableOpacity style={{flex: 1}} onPress={() => setItemPressed(false)}>
                        <View style={{
                            position: 'absolute',
                            padding: 20,
                            zIndex: 100,
                            flexDirection: 'column',
                            top: selectedPositionY,
                            left: selectedPositionX
                        }}>
                            {renderPopupMenuContent()}
                        </View>
                    </TouchableOpacity>
                </BlurView> : null
            )}
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
