import React, { memo } from "react";
import { View, ImageStyle, StyleSheet, ViewStyle } from "react-native";
import AnimatedLottieView from 'lottie-react-native';

import { Styles } from "@src/common";

interface NoDataProps {
    style: ViewStyle[] | ViewStyle;
    imageStyle?: ImageStyle
}

const NoDataComponent: React.FC<NoDataProps> = memo(({ style = {}, imageStyle = {} }) => {
    return (
        <View style={[styles.emptyContainerStyle, style]}>
            <AnimatedLottieView
                autoPlay={true}
                duration={4000}
                loop={true}
                source={require("@src/../assets/lottie/no-data.json")}
                style={[imageStyle, styles.imageStyle]}
            />
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