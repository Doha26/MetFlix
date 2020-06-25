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
    },
    absoluteItemStyle:{
        top:-250
    },
    absoluteMenuStyle:{
        backgroundColor: Colors.darkBlue,
        borderRadius: 10,
        marginTop:270,
        width: 300
    }
});

export default styles;
