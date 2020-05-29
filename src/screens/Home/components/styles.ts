import {StyleSheet} from "react-native";
import Colors from "~/theming/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        height: 250,
        marginTop: 110,
    },
    imageWrapper: {
        flex: 1,
        borderRadius:8,
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: 'orange',
        position: 'relative',
        transform: [{scale: 1}],
    },
    image: {
        flex: 1,
        width: '100%',
    },
    detailsWraper: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.lightgray,
    },
});

export default styles;
