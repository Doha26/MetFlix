import {StyleSheet} from "react-native";
import Colors from "~/theming/colors";

const styles = StyleSheet.create({
        Overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        Container: {
            flex: 1,
            justifyContent: 'space-between'
        },
        Header: {
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        Bar: {
            flex: 1,
            height: 40
        },
        PlayerSlider: {
            flex: 1,
            height: 40
        },
        Text: {
            color: Colors.white,
            fontSize: 14
        }
    })
;

export default styles;
