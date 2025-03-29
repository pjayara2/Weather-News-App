import { StyleSheet } from "react-native";
import { Fonts, Styles } from "@src/common";

const styles = StyleSheet.create({
    contentContainerStyle: {
        flexGrow: 1,
    },
    containerStyle: {
        padding: 10,
    },
    imageStyle: {
        width: Styles.width as number,
        height: Styles.height as number * 0.3,
    },
    titleStyle: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Medium
    },
    contentStyle: {
        paddingHorizontal: 15
    },
    desTextStyle: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Medium,
        marginBottom: 15
    },
    contentTextStyle: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular
    },
    dividerStyle: {
        width: 5,
        height: 40,
        marginRight: 10
    },
    publishAtStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateStyle: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 3, marginLeft: 5,
        fontFamily: Fonts.Poppins.Regular
    },
    publishStyle: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        marginLeft: 5,
    }
});

export default styles;