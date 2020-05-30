import {NavigationScreenProp} from "react-navigation";
import {WIDTH} from "~/utils/dimensions";
import { View} from "react-native";
import React, { useState} from "react";
import Colors from "~/theming/colors";

const SearchResults = ({query, navigation}: { query: string; navigation: NavigationScreenProp<any> }) => {

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    return (
        <View style={{
            flex: 1,
            marginTop: 20,
            backgroundColor: Colors.filterBlack,
            width: WIDTH
        }}>
        </View>
    );
};
export default SearchResults;
