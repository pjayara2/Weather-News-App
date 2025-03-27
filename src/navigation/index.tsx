import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';

import { darkTheme, lightTheme } from '../utils/theme';
import { Home, News } from '../screens';
import Routes from './Routes';

const RootStack = createNativeStackNavigator();

const App = () => {

    const scheme = useColorScheme();

    return (
        <NavigationContainer theme={scheme === 'dark' ? darkTheme : lightTheme}>
            <RootStack.Navigator>
                <RootStack.Screen
                    name={Routes.Home}
                    component={Home}
                />
                <RootStack.Screen
                    name={Routes.News}
                    component={News}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

export default App;