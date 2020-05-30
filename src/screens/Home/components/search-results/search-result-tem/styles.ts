import {StyleSheet} from "react-native";
import Colors from "~/theming/colors";

const styles = StyleSheet.create({
    itemRow: {
        flex: 10,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        height: 160,
        borderRadius: 8,
        overflow: 'hidden'
    },
    imageWrapper: {
        flex: 3,
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: 'orange',
        position: 'relative',
    },
    image: {
        flex: 1,
        resizeMode: "stretch"
    },
    detailWrapper: {
        flex: 7,
        padding: 12,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    titleStyle: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: '500',
        color: Colors.lightGrey
    },
    subtitleStyle: {
        fontSize: 21,
        color: Colors.filterBlack,
        fontWeight: '400'
    },
    itemStat: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;
