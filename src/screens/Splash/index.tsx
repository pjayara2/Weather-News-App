import React, { useEffect } from 'react';
import { NavigationProp, useNavigation, useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, View } from 'react-native';
import { RESULTS } from 'react-native-permissions';
import { useDispatch } from 'react-redux';

import requestLocationPermission from '@src/utils/permission';
import { fetchGpsData } from '@src/redux-store/slice/gps';
import { AppDispatch } from '@src/redux-store';
import Routes from '@src/navigation/Routes';
import styles from './styles';

const Splash = () => {

    const { colors } = useTheme();
    const navigation = useNavigation<NavigationProp<any>>();
    const { bottom } = useSafeAreaInsets();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        requestCurrentLocation();
    }, []);

    const requestCurrentLocation = async () => {
        requestLocationPermission().then(result => {
            switch (result) {
                case RESULTS.GRANTED:
                    getCurrentLocation();
                    break;
                default:
                    navigation.navigate(Routes.TabNavigation);
                    break;
            }
        });
    }

    const getCurrentLocation = async () => {
        await dispatch(fetchGpsData());
        navigation.navigate(Routes.TabNavigation);
    }

    return (
        <View style={styles.contentContainerStyle}>
            <ActivityIndicator
                size={'large'}
                color={colors.primary}
                style={{ paddingBottom: bottom + 15 }}
            />
        </View>
    );
};

export default Splash;