import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, ImageSourcePropType, ImageStyle, ViewStyle } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

interface ProgressiveImageProps extends FastImageProps {
    thumbnailSource?: ImageSourcePropType;
    source: ImageSourcePropType;
    containerStyle?: ViewStyle;
    style?: ImageStyle;
    defaultSource?: ImageSourcePropType;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
    thumbnailSource,
    containerStyle,
    style,
    source,
    defaultSource,
    ...props
}) => {

    const [imageSource, setImageSource] = useState(source);
    const thumbnailAnimated = useRef(new Animated.Value(0)).current;
    const imageAnimated = useRef(new Animated.Value(0)).current;

    const handleThumbnailLoad = () => {
        Animated.timing(thumbnailAnimated, {
            toValue: 1,
            useNativeDriver: false,
        }).start();
    };

    const onImageLoad = () => {
        Animated.timing(imageAnimated, {
            toValue: 1,
            useNativeDriver: false,
        }).start();
    };

    const onImageError = () => {
        if (defaultSource) {
            setImageSource(defaultSource);
        }
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <AnimatedImage
                {...props}
                source={thumbnailSource}
                style={[style, { opacity: thumbnailAnimated }]}
                onLoad={handleThumbnailLoad}
                blurRadius={1}
            />
            <AnimatedImage
                {...props}
                source={imageSource}
                style={[styles.imageOverlay, { opacity: imageAnimated }, style]}
                onError={onImageError}
                onLoad={onImageLoad}
            />
        </View>
    );
};

export default ProgressiveImage;

const styles = StyleSheet.create({
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    container: {
        backgroundColor: '#e1e4e8',
        borderRadius: 10,
    },
});
