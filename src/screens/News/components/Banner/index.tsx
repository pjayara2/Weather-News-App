import React, { memo, useCallback, useState } from 'react';
import Carousel, { Pagination } from 'react-native-new-snap-carousel';
import { NavigationProp, useTheme } from '@react-navigation/native';
import { View } from 'react-native';

import { NewsArticle } from '@src/type/newsArticleTypes';
import { HeadlineItem } from '@src/components';
import { CustomTheme } from '@src/utils/theme';
import Routes from '@src/navigation/Routes';
import { Styles } from '@src/common';
import styles from './styles';

interface BannerImageProps {
    headlines: NewsArticle[],
    navigation: NavigationProp<any>
};

const BannerImage: React.FC<BannerImageProps> = memo(({ headlines, navigation }) => {

    // Hooks
    const { colors } = useTheme() as CustomTheme;

    // States
    const [activeSlide, setActiveSlide] = useState(0);

    const onPressBanner = useCallback((item: NewsArticle) => {
        navigation.navigate(Routes.NewsDetails, {
            newsFeed: JSON.stringify(item)
        });
    }, []);

    const _renderItem = useCallback(({ item, index }: { item: NewsArticle, index: number }) => {
        return (
            <HeadlineItem
                headline={item}
                onPress={() => onPressBanner(item)}
            />
        );
    }, []);

    if (headlines?.length == 0 || headlines === null) {
        return null; // array empty or does not exist
    }

    return (
        <View style={styles.contentContainerStyle}>
            <Carousel
                data={headlines}
                autoplay loop
                autoplayDelay={6000}
                autoplayInterval={6000}
                paddingHorizontal={10}
                sliderWidth={Styles.width}
                itemWidth={Styles.width as number - 15}
                loopClonesPerSide={5}
                activeSlideAlignment={'start'}
                renderItem={_renderItem}
                onSnapToItem={setActiveSlide}
            />
            <Pagination
                dotsLength={headlines.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.containerStyle}
                dotStyle={[styles.dotStyle, { backgroundColor: colors.primary }]}
                inactiveDotStyle={[styles.inactiveDotStyle, { backgroundColor: colors.gray }]}
                inactiveDotOpacity={0.6}
                inactiveDotScale={0.6}
            />
        </View>
    );
});

export default BannerImage;