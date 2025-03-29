import { Dimensions, Platform, StyleSheet } from "react-native";
import Fonts from "./Fonts";

const { height, width } = Dimensions.get("window");

const Styles = StyleSheet.create({
    width: width,

    // Conditional height based on platform
    height: Platform.OS !== "ios" ? height : height - 20,

    tabBarContainerStyle: {
        flexDirection: 'row',
        elevation: 15,
    },
    tabBarLabelStyle: {
        marginTop: 2,
        fontSize: 13,
    },
    tabIndicatorStyle: {
        width: '40%',
        borderRadius: 5,
        position: 'absolute',
    },
    headerStyle: {
        elevation: 5,
        backgroundColor: '#cc0001'
    },
    headerTitleStyle: {
        fontSize: 14,
        color: '#FFF',
        fontFamily: Fonts.Poppins.Medium
    },
    indicatorStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }

});

export default Styles;
