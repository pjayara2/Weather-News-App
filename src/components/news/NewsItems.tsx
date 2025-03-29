import { memo } from "react";

import { NewsArticle } from "@src/type/newsArticleTypes";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import ProgressiveImage from "../ProgressiveImage";
import FastImage from "react-native-fast-image";
import { Styles } from "@src/common";

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
        </View>
    );
});

export default NewsItems;

const styles = StyleSheet.create({
    containerStyle: {
        padding: 10,
        borderRadius: 10,
    },
    imageStyle: {
        width: Styles.width as number * 0.25,
        height: Styles.width as number * 0.25,
        borderRadius: 10
    }
});