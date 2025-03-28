import { Dimensions, Platform, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

const Styles = StyleSheet.create({
    width: width,

    // Conditional height based on platform
    height: Platform.OS !== "ios" ? height : height - 20,
});

export default Styles;
