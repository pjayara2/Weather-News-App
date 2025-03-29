import React, { useCallback, useEffect, useState } from "react";
import { NavigationProp, useNavigation, useTheme } from "@react-navigation/native";
import { ActivityIndicator, FlatList, View } from "react-native";

import { NewsItems, NoDataComponent } from "@src/components";
import { NewsArticle } from "@src/type/newsArticleTypes";
import FetchApis from "@src/services/FetchApis";
import { handleApiError } from "@src/utils/commonUtils";
import { useSnackbar } from "@src/hooks/useSnackbar";
import { Constants, Styles } from "@src/common";
import Routes from "@src/navigation/Routes";
import styles from "./styles";

interface NewsFeedProps { };

const perPage = 100;
var onEndReachedCalledDuringMomentum = true;

const NewsFeed: React.FC<NewsFeedProps> = () => {

    const { colors } = useTheme();
    const snackbar = useSnackbar();
    const navigation = useNavigation<NavigationProp<any>>();

    const [news, setNews] = useState<NewsArticle[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(2);
    const [hasMoreToLoad, setMoreToLoad] = useState<boolean>(true);
    const [initialState, setInitialState] = useState<boolean>(true);
    const [filters, setFilters] = useState({ sortBy: 'popularity', from: null, to: null });

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFooter, setFooter] = useState<boolean>(false);

    const onLoadNewsDetails = useCallback(async () => {
        try {
            const params = {
                apiKey: Constants.newsApiKey,
                pageSize: perPage,
                page: currentPage,
                sortBy: filters?.sortBy,
                q: 'apple',
            };
            const concatUrl = Constants.concatUrl.news.everything;
            const response: any = await FetchApis.get(concatUrl, { params });

            if (response.status === 'ok') {
                const articles = response?.articles || [];
                setNews((prev) => (currentPage === 1 ? articles : [...prev, ...articles]));
                setMoreToLoad(perPage === articles.lenght);
                setInitialState(false);
            }
        } catch (error: any) {
            handleApiError(error, snackbar);
        } finally {
            setIsLoading(false); setRefreshing(false); setFooter(false);
        }
    }, [currentPage, filters]);

    useEffect(() => {
        onLoadNewsDetails();
    }, [onLoadNewsDetails]);

    const onRefreshControl = useCallback(async () => {
        setCurrentPage(1);
        setIsLoading(true);
        setRefreshing(true);
        setInitialState(true);
        setMoreToLoad(true);

        setTimeout(() => { if (currentPage == 1) onLoadNewsDetails(); }, 0);
    }, [currentPage]);

    const onEndReached = useCallback(async () => {
        if (!hasMoreToLoad) return null;
        if (!initialState) handleReachEnded();
    }, [initialState, hasMoreToLoad]);

    const handleReachEnded = async () => {
        if (!onEndReachedCalledDuringMomentum) {
            setFooter(true);
            setInitialState(true);
            setCurrentPage(currentPage + 1);
            onEndReachedCalledDuringMomentum = true;
        }
    };

    const onPressNewsfeed = useCallback((newsFeed: NewsArticle) => {
        navigation.navigate(Routes.NewsDetails, {
            newsFeed: JSON.stringify(newsFeed)
        });
    }, []);

    const _renderItem = useCallback(({ item, index }: { item: NewsArticle, index: number }) => (
        <NewsItems
            newsItem={item}
            key={item.source.id}
            onPress={() => onPressNewsfeed(item)}
        />
    ), []);

    const _renderEmpty = useCallback(() => {
        if (isLoading) return null;

        return (
            <NoDataComponent
                style={[styles.emptyContainerStyle, { backgroundColor: colors.background }]}
                imageStyle={styles.nodataImage}
            />
        )
    }, []);

    const _renderFooter = useCallback(() => {
        if (!isFooter) return null;

        return (
            <ActivityIndicator
                size={'large'}
                color={colors.primary}
            />
        );
    }, []);

    const renderSeparator = useCallback(() => <View style={{ marginTop: 10 }} />, []);

    if (isLoading) {
        return (
            <ActivityIndicator
                size={'large'}
                color={colors.primary}
                style={[Styles.indicatorStyle, { backgroundColor: colors.background }]}
            />
        );
    }

    return (
        <View style={[styles.contentContainerStyle, { backgroundColor: colors.background }]}>
            <FlatList
                data={news}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => `${index}`}
                renderItem={_renderItem}
                ListEmptyComponent={_renderEmpty}
                ListFooterComponent={_renderFooter}
                ItemSeparatorComponent={renderSeparator}
                onEndReachedThreshold={0.5}
                onEndReached={onEndReached}
                refreshing={refreshing}
                onRefresh={onRefreshControl}
                onMomentumScrollBegin={() => {
                    onEndReachedCalledDuringMomentum = false;
                }}
                ListFooterComponentStyle={styles.footerStyle}
                contentContainerStyle={styles.containerStyle}
            />
        </View>
    );
};

export default NewsFeed;
