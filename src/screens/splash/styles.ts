import {StyleSheet} from "react-native";
import Colors from "~/theming/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.black,
    },
    loadingContainer: {
        marginTop: 20,
    },
});

export default styles;
