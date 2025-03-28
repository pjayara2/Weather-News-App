import React, { memo } from "react";
import { View, ImageStyle, StyleSheet, ViewStyle } from "react-native";
import { Styles } from "@src/common";

interface NoDataProps {
    style: ViewStyle[] | ViewStyle;
    imageStyle?: ImageStyle
}

const NoDataComponent: React.FC<NoDataProps> = memo(({ style = {}, imageStyle = {} }) => {
    return (
        <View style={[styles.emptyContainerStyle, style]}>
            {/* <Image
                alt={'No-data'}
                resizeMode="contain"
                source={Images.noData}
                style={[styles.imageStyle, imageStyle]}
            /> */}
        </View>
    );
});

const styles = StyleSheet.create({
    emptyContainerStyle: {

    },
    imageStyle: {
        height: Styles.height as number * 0.3,
        width: Styles.height as number * 0.3,
    },
});

export default NoDataComponent;