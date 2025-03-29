import React, { useCallback, useEffect, useState } from "react";
import { NavigationProp, useNavigation, useTheme } from "@react-navigation/native";
import { RefreshControl, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import { handleApiError } from "@src/utils/commonUtils";
import { useSnackbar } from "@src/hooks/useSnackbar";
import { CustomTheme } from "@src/utils/theme";
import FetchApis from "@src/services/FetchApis";
import { Constants } from "@src/common";
import styles from "./styles";
import { gpsSelectors } from "@src/redux-store/slice/gps";
import { RootState } from "@src/redux-store";

interface WeatherProps { };

const Weather: React.FC<WeatherProps> = () => {

    const { colors } = useTheme() as CustomTheme;
    const snackbar = useSnackbar();
    const navigation = useNavigation<NavigationProp<any>>();

    const [weatherData, setWeatherData] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Redux
    const coords = useSelector(gpsSelectors.selectCoords);

    console.log("coords", coords);

    const onLoadWeatherDetails = useCallback(async () => {
        try {
            const params = {
                appid: Constants.weatherApiKey,
                lat: coords?.latitude,
                lon: coords?.longitude,
            };
            const concatUrl = Constants.concatUrl.weather.weather;
            const response: any = await FetchApis.get(concatUrl, { params });

            if (response.status === 'ok') {
                setWeatherData(response?.articles.slice(0, 5));
            }
        } catch (error: any) {
            handleApiError(error, snackbar);
        } finally {
            setIsLoading(false); setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        onLoadWeatherDetails();
    }, [onLoadWeatherDetails]);

    const onRefreshControl = useCallback(() => {

    }, []);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.containerStyle, { backgroundColor: colors.background }]}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshControl} />}
        >

        </ScrollView>
    );
};

export default Weather;
