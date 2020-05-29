import {Dimensions, StyleSheet} from "react-native";
import Colors from "~/theming/colors";

const {width} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: (width / 3) + 5,
        height: 250, marginTop: 10,
    },
    imageWrapper: {
        flex: 1,
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: 'orange',
        position: 'relative',
    },
    image: {
        flex: 1,
        resizeMode: "stretch"
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
    titleStyle: {
        fontSize: 22,
        marginTop: 3,
        fontWeight: '500',
        color: Colors.white
    },
    subtitleStyle: {
        color: Colors.white,
        fontWeight: '400'
    }
});
export default styles;
