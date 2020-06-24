import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Colors from "~/theming/colors";

const { width, height } = Dimensions.get("window");


const  BlackOverlay  = () => {
  return (
    <View style={styles.overlay} />
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width:width,
    height:height,
    position:"absolute",
    zIndex:600,
    backgroundColor:Colors.blackOverlay
  },
});

export default BlackOverlay;
