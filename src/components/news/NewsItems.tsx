import { memo } from "react";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";

import { NewsArticle } from "@src/type/newsArticleTypes";
import ProgressiveImage from "../ProgressiveImage";
import { Fonts, Icons, Styles } from "@src/common";
import { Icon } from "react-native-elements";

interface NewsItemsProps {
    newsItem: NewsArticle
}

const NewsItems: React.FC<NewsItemsProps> = memo(({ newsItem }) => {

    const { colors } = useTheme();

    return (
        <View style={[styles.containerStyle, { backgroundColor: colors.card }]}>
            <ProgressiveImage
                source={{ uri: newsItem.urlToImage }}
                style={styles.imageStyle}
                containerStyle={styles.imageStyle}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.newsStyle}>
                <Text
                    numberOfLines={2}
                    style={[styles.titleStyle, { color: colors.text }]}
                >
                    {newsItem?.title}
                </Text>
                <View style={styles.publishAtStyle}>
                    <Icon
                        type={'material-community'}
                        name={Icons.Ionicons.time}
                    />
                </View>
            </View>
        </View>
    );
});

export default NewsItems;

const styles = StyleSheet.create({
    containerStyle: {
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
    },
    imageStyle: {
        width: Styles.width as number * 0.25,
        height: Styles.width as number * 0.25,
        borderRadius: 10
    },
    newsStyle: {
        flex: 1,
        marginLeft: 5
    },
    titleStyle: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular
    },
    publishAtStyle: {
        flexDirection: 'row',
        alignItems: 'center'
        // fontSize: 12,
        // fontFamily: Fonts.Poppins.Regular,
    }
});