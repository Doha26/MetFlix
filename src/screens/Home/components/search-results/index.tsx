import React from "react";
import {useSelector} from "react-redux";
import {NavigationScreenProp} from "react-navigation";
import {View, FlatList} from "react-native";
import SearchResultItem from "~/screens/Home/components/search-results/search-result-tem";
import {MovieType} from "~/types/Movie";
import {SearchReducerType} from "~/types/SearchReducerType";

const SearchResults = ({navigation}: { navigation: NavigationScreenProp<any> }) => {

    // Get the result from redux store
    const {search_results} = useSelector(({searchReducer}:{searchReducer:SearchReducerType}) => searchReducer);

    const renderItem = (item: MovieType) => {
        return (
            <SearchResultItem movie={item} navigation={navigation}/>
        )
    };

    return (
        <View style={{
            flex: 1,
            marginTop: 20,
            marginHorizontal: 10,
            paddingHorizontal: 5,
        }}>

            <FlatList
                data={search_results}
                horizontal={false}
                renderItem={({item}) => renderItem(item)}
                style={{marginTop: 10}}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{marginTop: 10}}/>}
            />
        </View>
    );
};
export default SearchResults;
