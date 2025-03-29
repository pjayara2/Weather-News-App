import React, { useCallback, useEffect, useState } from "react";
import { NavigationProp, useNavigation, useTheme } from "@react-navigation/native";
import { ActivityIndicator, RefreshControl, ScrollView } from "react-native";

import { NewsArticle } from "@src/type/newsArticleTypes";
import FetchApis from "@src/services/FetchApis";
import { handleApiError } from "@src/utils/commonUtils";
import { useSnackbar } from "@src/hooks/useSnackbar";
import { Constants, Styles } from "@src/common";
import Category from "./components/Category";
import Headlines from "./components/Headlines";
import BannerImage from "./components/Banner";
import styles from "./styles";

interface NewsProps { };

const News: React.FC<NewsProps> = () => {

    const { colors } = useTheme();
    const snackbar = useSnackbar();
    const navigation = useNavigation<NavigationProp<any>>();

    const [headlines, setHeadlines] = useState<NewsArticle[]>([]);

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        onLoadNewsDetails();
    }, []);

    const onLoadNewsDetails = useCallback(async () => {
        try {
            const params = {
                apiKey: Constants.newsApiKey,
                category: 'general'
            };
            const concatUrl = Constants.concatUrl.news.headlines;
            const response: any = await FetchApis.get(concatUrl, { params });

            if (response.status === 'ok') {
                setHeadlines(response?.articles.slice(0, 5));
            }
        } catch (error: any) {
            handleApiError(error, snackbar);
        } finally {
            setIsLoading(false); setRefreshing(false);
        }
    }, []);

    const onRefreshControl = useCallback(async () => {
        setIsLoading(true);
        setRefreshing(true);
        await onLoadNewsDetails();
    }, []);


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
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.containerStyle, { backgroundColor: colors.background }]}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshControl} />}
        >
            <BannerImage
                headlines={headlines}
                navigation={navigation}
            />
            <Category />
            <Headlines
                headlines={headlines}
                navigation={navigation}
            />
        </ScrollView>
    );
};

export default News;
