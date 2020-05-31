import {StyleSheet} from "react-native";
import Colors from "~/theming/colors";

const styles = StyleSheet.create({
    countResultTitle:{
        fontSize: 16,
        marginTop: 3,
        fontWeight: '500',
        color: Colors.lightGrey
    },
    searchStats:{
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingVertical: 10,
        marginTop: 5,
        marginHorizontal: 10
    }
});

export default styles;
