import { memo, useCallback } from "react";
import { NavigationProp } from "@react-navigation/native";
import { FlatList, View } from "react-native";

import { NewsArticle } from "@src/type/newsArticleTypes";
import { NewsItems, SectionHeader } from "@src/components";
import Routes from "@src/navigation/Routes";
import styles from "./styles";

interface HeadlinesProps {
    headlines: NewsArticle[];
    navigation: NavigationProp<any>;
}

const Headlines: React.FC<HeadlinesProps> = memo(({ headlines, navigation }) => {

    const onPressNewsfeed = useCallback((item: NewsArticle) => {
        navigation.navigate(Routes.NewsDetails, {
            newsFeed: JSON.stringify(item)
        });
    }, []);

    const onPressMoreHandle = useCallback(() => {
        navigation.navigate(Routes.NewsFeed);
    }, []);

    const _renderItem = useCallback(({ item, index }: { item: NewsArticle, index: number }) => (
        <NewsItems
            newsItem={item}
            key={item.source.id}
            onPress={() => onPressNewsfeed(item)}
        />
    ), []);

    const _renderSeparator = useCallback(() => <View style={{ height: 10 }} />, []);

    if (headlines.length === 0 || headlines === undefined) {
        return null;
    }

    return (
        <View style={styles.contentContainerStyle}>
            <SectionHeader
                title={"Headlines"}
                containerStyle={styles.sectionStyle}
                rightAction={onPressMoreHandle}
            />
            <FlatList
                data={headlines}
                renderItem={_renderItem}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `${index}`}
                contentContainerStyle={styles.containerStyle}
                ItemSeparatorComponent={_renderSeparator}
            />
        </View>
    );
})

export default Headlines;