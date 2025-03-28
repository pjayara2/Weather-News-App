import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, useColorScheme } from 'react-native';

import { darkTheme, lightTheme } from '@src/utils/theme';
import TabNavigation from './TabNavigation';
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
            <RootStack.Navigator>
                <RootStack.Screen
                    name={Routes.TabNavigation}
                    component={TabNavigation}
                    options={{ headerShown: false }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

export default App;