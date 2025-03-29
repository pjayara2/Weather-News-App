import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, useColorScheme } from 'react-native';

import { Splash, NewsDetails, NewsFeed } from '@src/screens';
import { darkTheme, lightTheme } from '@src/utils/theme';
import TabNavigation from './TabNavigation';
import { Styles } from '@src/common';
import Routes from './Routes';

const RootStack = createNativeStackNavigator();

const App = () => {

    const scheme = useColorScheme();

    return (
        <NavigationContainer theme={scheme === 'dark' ? darkTheme : lightTheme}>
            <StatusBar
                backgroundColor={'#cc0001'}
                barStyle={"light-content"}
                translucent={false}
            />
            <RootStack.Navigator screenOptions={{
                headerShown: true,
                headerStyle: Styles.headerStyle as any,
                headerTitleStyle: Styles.headerTitleStyle as any,
            }}>
                <RootStack.Screen
                    name={Routes.Splash}
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name={Routes.TabNavigation}
                    component={TabNavigation}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name={Routes.NewsFeed}
                    component={NewsFeed}
                    options={{ title: 'News Feed', headerTintColor: '#FFF' }}
                />
                <RootStack.Screen
                    name={Routes.NewsDetails}
                    component={NewsDetails}
                    options={{ headerTitleAlign: 'left', headerTintColor: '#FFF' }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

export default App;