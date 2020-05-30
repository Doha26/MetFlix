import {NavigationScreenProp} from "react-navigation";
import {View, FlatList,StyleSheet} from "react-native";
import React from "react";
import {useSelector} from "react-redux";
import SearchResultItem from "~/screens/Home/components/search-results/search-result-tem";
import {MovieType} from "~/types/Movie";
import Colors from "~/theming/colors";

const SearchResults = ({navigation}: { navigation: NavigationScreenProp<any> }) => {

    // Get the result from redux store
    const {search_results} = useSelector(({searchReducer}) => searchReducer);

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


const styles = StyleSheet.create({
    countResultTitle:{
        fontSize: 16,
        marginTop: 3,
        fontWeight: '500',
        color: Colors.lightGrey
    }
});
export default SearchResults;
