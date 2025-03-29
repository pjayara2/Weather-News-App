import { View } from 'react-native';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import { Fonts, Icons, Styles } from '@src/common';
import { Home, News } from '@src/screens';
import Routes from './Routes';

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {

    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();

    return (
        <View style={Styles.tabBarContainerStyle}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const getNameIcon = () => {
                    switch (index) {
                        case 0:
                            return Icons.Ionicons.weather;
                        case 1:
                            return Icons.Ionicons.newsFeed;
                        default:
                            return Icons.Ionicons.newsFeed;
                    }
                };

                return (
                    <PlatformPressable
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        pressOpacity={1}
                        style={{ flex: 1, alignItems: 'center' }}
                    >
                        <Icon
                            type={'ionicon'}
                            name={'home-outline'}
                            containerStyle={{}}
                            color={isFocused ? colors.primary : colors.text}
                        />
                        <Text
                            style={{
                                marginTop: 2,
                                fontSize: 12,
                                fontFamily: Fonts.Poppins.Medium,
                                color: isFocused ? colors.primary : colors.text
                            }}
                        >
                            {label}
                        </Text>
                    </PlatformPressable>
                );
            })}
        </View>
    );
}

const TabNavigation = () => {

    const { colors } = useTheme();

    return (
        <Tab.Navigator
            initialRouteName='News'
            backBehavior={'initialRoute'}
            screenOptions={({ route }) => ({
                lazy: true,
                headerShown: true,
                headerTitleAlign: 'center',
                headerStyle: [Styles.headerStyle, { backgroundColor: colors.primary }],
                headerTitleStyle: [Styles.headerTitleStyle, { color: colors.background }],
            })}
            tabBar={(props) => <MyTabBar {...props} />}
        >
            <Tab.Screen name={Routes.Home} component={Home} options={{ title: 'Weather' }} />
            <Tab.Screen name={Routes.News} component={News} options={{ title: 'News Feed' }} />
        </Tab.Navigator>
    );
};

export default TabNavigation;