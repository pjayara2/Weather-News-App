import { memo } from "react";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Icon } from "react-native-elements";
import moment from 'moment';

import { NewsArticle } from "@src/type/newsArticleTypes";
import { Fonts, Icons, Images, Styles } from "@src/common";
import ProgressiveImage from "../ProgressiveImage";
import { CustomTheme } from "@src/utils/theme";

interface NewsItemsProps {
    newsItem: NewsArticle,
    onPress: () => void;
}

const NewsItems: React.FC<NewsItemsProps> = memo(({ newsItem, onPress }) => {

    const { colors } = useTheme() as CustomTheme;

    return (
        <TouchableOpacity
            onPress={onPress} activeOpacity={1}
            style={[styles.containerStyle, { backgroundColor: colors.card }]}
        >
            <ProgressiveImage
                source={{ uri: newsItem.urlToImage }}
                style={styles.imageStyle}
                // thumbnailSource={Images.default}
                containerStyle={styles.imageStyle}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.newsStyle}>
                <Text numberOfLines={2} style={[styles.titleStyle, { color: colors.text }]}>
                    {newsItem?.title}
                </Text>
                <View style={styles.publishAtStyle}>
                    <Icon
                        type={'material-community'}
                        name={Icons.MaterialCommunityIcons.typewriter}
                        size={18}
                        color={colors.gray}
                    />
                    <Text style={[styles.dateStyle, { color: colors.gray }]}>
                        {newsItem?.author}
                    </Text>
                </View>
                <View style={styles.publishAtStyle}>
                    <Icon
                        type={'material-community'}
                        name={Icons.MaterialCommunityIcons.time}
                        size={18}
                        color={colors.gray}
                    />
                    <Text style={[styles.dateStyle, { color: colors.gray }]}>
                        {moment(newsItem?.publishedAt).format('MMM D YYYY')}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
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
        marginLeft: 5,
        marginTop: 5,
    },
    titleStyle: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Medium
    },
    publishAtStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateStyle: {
        fontSize: 12,
        marginLeft: 5, marginTop: 5,
        fontFamily: Fonts.Poppins.Regular,
    },
});