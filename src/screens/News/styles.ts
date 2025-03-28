import { getBottomSpace, } from 'react-native-iphone-x-helper';
import { StyleSheet } from "react-native";
import { Styles } from "@src/common";

const styles = StyleSheet.create({
    contentContainerStyle: {
        flexGrow: 1,
        backgroundColor: 'red'
    },
    containerStyle: {
        flexGrow: 1,
        paddingTop: 20,
        paddingHorizontal: 15,
        paddingBottom: getBottomSpace() + 40,
    },
    footerStyle: {
        marginVertical: 20
    },
    nodataImage: {
        width: Styles.width as number,
        height: Styles.height as number - 300
    },
    emptyContainerStyle: {
        alignItems: "center",
        justifyContent: "center",
        height: Styles.height as number * 0.8
    }
});

export default styles;