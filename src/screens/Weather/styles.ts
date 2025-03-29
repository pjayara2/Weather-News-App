import { getBottomSpace, } from 'react-native-iphone-x-helper';
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerStyle: {
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: getBottomSpace() + 40,
    },
});

export default styles;