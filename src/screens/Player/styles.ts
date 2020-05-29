import {Dimensions, StyleSheet} from "react-native";
import Colors from "~/theming/colors";

const {width,height}= Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
    },

    imageWrapper: {
        flex: 1,
        width: width,
        height: height,
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: 'orange',
        position: 'relative',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    detailsWraper: {
        position: 'absolute',
        bottom: 10,
        margin: 2,
        borderRadius: 8,
        right: 0,
        height: '40%',
        left: 0,
        overflow: 'scroll',
        zIndex: 1000,
        padding: 20,
        backgroundColor: Colors.whiteGray,
    },

    titleStyle: {
        fontSize: 25,
        marginTop: 3,
        fontWeight: 'bold',
        color: Colors.darkGrey,
    },
    subTitleStyle: {
        fontSize: 20,
        marginTop: 6,
        fontWeight: '500',
        paddingBottom: 5,
        color: Colors.darkGrey,
    },
    descriptionStyle: {
        color: Colors.darkGrey,
        marginTop: 10,
        fontWeight: '400',
        marginBottom: 10,
    },
    playerButton: {
        position: 'absolute',
        right: 30,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '38%',
        zIndex: 1500,
        width: 75,
        height: 75,
        shadowColor: Colors.filterBlack,
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor: Colors.blue,
        borderRadius: 37.5,
    },
});
export default styles;
