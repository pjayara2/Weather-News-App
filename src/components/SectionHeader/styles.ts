import { Fonts } from '@src/common';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    tOpacity: {
        justifyContent: "center",
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 15,
        fontFamily: Fonts.Poppins.Medium,
    }
});

export default styles;