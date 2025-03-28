import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import { NewsItems, NoDataComponent } from "@src/components";
import { NewsArticle } from "@src/type/newsArticleTypes";
import FetchApis from "@src/services/FetchApis";
import { Constants, Styles } from "@src/common";
import styles from "./styles";

interface NewsProps { };

var onEndReachedCalledDuringMomentum = true;

const News: React.FC<NewsProps> = () => {

    const { colors } = useTheme();

    const [news, setNews] = useState<NewsArticle[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMoreToLoad, setMoreToLoad] = useState<boolean>(true);
    const [initialState, setInitialState] = useState<boolean>(true);
    const [filters, setFilters] = useState({ from: null, to: null, sortBy: null });

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFooter, setFooter] = useState<boolean>(false);

    const onLoadNewsDetails = useCallback(async () => {
        try {
            const params = {
                // q: '',
                // from: '',
                // to: '',
                // sortBy: '',
                apiKey: Constants.newsApiKey
            };
            const concatUrl = Constants.concatUrl.news.everything;

            const response: any = await fetch(`https://newsapi.org/v2/everything?q=apple&from=2025-03-27&to=2025-03-27&sortBy=popularity&apiKey=12ccc2c1783e4bbf96d5b75a6aae5aff`);
            const data = await response.json();
            console.log(data);

            if (data.status === 'ok') {
                setNews(data?.articles);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setIsLoading(false); setRefreshing(false); setFooter(false);
        }
    }, [currentPage, filters]);

    useEffect(() => {
        onLoadNewsDetails();
    }, [onLoadNewsDetails]);

    const onRefreshControl = async () => {
        setCurrentPage(1); setIsLoading(true);
        setRefreshing(true); setInitialState(true);
        setMoreToLoad(true);
    };

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

    const _renderItem = useCallback(({ item, index }: { item: NewsArticle, index: number }) => (
        <NewsItems
            newsItem={item}
            key={item.source.id}
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

export default News;
