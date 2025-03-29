import React, { useEffect } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import Routes from '@src/navigation/Routes';

const Splash = () => {

    const navigation = useNavigation<NavigationProp<any>>();

    useEffect(() => {
        onAuthVerification();
    }, []);

    const onAuthVerification = () => {
        navigation.navigate(Routes.TabNavigation);
    }

    return <View />;
};

export default Splash;