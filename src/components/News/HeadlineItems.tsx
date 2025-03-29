import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { Icon } from "react-native-elements";

import { NewsArticle } from "@src/type/newsArticleTypes";
import ProgressiveImage from "../ProgressiveImage";
import { Fonts, Icons, Styles } from "@src/common";
import { CustomTheme } from "@src/utils/theme";
import moment from "moment";

interface HeadlineItemProps {
    headline: NewsArticle;
    onPress: () => void;
};

const HeadlineItem: React.FC<HeadlineItemProps> = memo(({ headline, onPress }) => {

    const { colors } = useTheme() as CustomTheme;

    return (
        <TouchableOpacity style={styles.sliderItems} activeOpacity={1} onPress={onPress}>
            <ProgressiveImage
                style={styles.imageStyle}
                accessibilityLabel={'Banner-Image'}
                resizeMode={FastImage.resizeMode.stretch}
                source={{ uri: headline?.urlToImage }}
            />
            <View style={[styles.containerStyle, { flex: 1 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.dividerStyle, { backgroundColor: colors.yellow }]} />
                    <Text numberOfLines={2} style={[styles.titleStyle, { color: colors.white }]}>
                        {headline?.title}
                    </Text>
                </View>
                {/* <View style={[styles.publishAtStyle, { flex: 1 }]}>
                    <Icon
                        type={'material-community'}
                        name={Icons.MaterialCommunityIcons.time}
                        size={18}
                        color={colors.primary}
                    />
                    <Text style={[styles.dateStyle, { color: colors.gray }]}>
                        {moment(headline?.publishedAt).format('MMM D YYYY')}
                    </Text>
                </View> */}
            </View>
        </TouchableOpacity>
    );
});

export default HeadlineItem;

const styles = StyleSheet.create({
    sliderItems: {
        flex: 1,
        elevation: 2,
        borderRadius: 10,
        overflow: 'hidden',
        width: Styles.width as number - 22,
        height: Styles.height as number * 0.3,
        justifyContent: 'flex-end'
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    containerStyle: {
        padding: 10,
        position: 'absolute'
    },
    titleStyle: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Medium
    },
    contentStyle: {
        paddingHorizontal: 15
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