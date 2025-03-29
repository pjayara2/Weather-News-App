import { useCallback, useEffect, useState } from "react";
import { NavigationProp, useFocusEffect, useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Icon } from "react-native-elements";

import { NewsArticle } from "@src/type/newsArticleTypes";
import { safeParseJson } from "@src/utils/commonUtils";
import { ProgressiveImage } from "@src/components";
import { CustomTheme } from "@src/utils/theme";
import { Icons, Images } from "@src/common";
import styles from "./styles";
import moment from "moment";

interface NewsDetailsProps { };

const NewsDetails: React.FC<NewsDetailsProps> = () => {

    const { colors } = useTheme() as CustomTheme;
    const { params } = useRoute<any>();
    const navigation = useNavigation<NavigationProp<any>>();

    const [newsFeed, setNewsFeed] = useState<NewsArticle | null>(null);

    useEffect(() => {
        const parseJson = safeParseJson(params?.newsFeed);
        setNewsFeed(parseJson);
    }, [params]);

    useFocusEffect(
        useCallback(() => {
            navigation.setOptions({
                title: JSON.parse(params.newsFeed)?.title
            });
        }, [params])
    );

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: colors.background }}
            contentContainerStyle={styles.contentContainerStyle}
        >
            <ProgressiveImage
                key={newsFeed?.urlToImage}
                source={{ uri: newsFeed?.urlToImage }}
                thumbnailSource={Images.default}
                style={styles.imageStyle}
                containerStyle={styles.imageStyle}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.containerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.dividerStyle, { backgroundColor: colors.yellow, }]} />
                    <Text style={styles.titleStyle}>
                        {newsFeed?.title}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.publishAtStyle}>
                        <Icon
                            type={'material-community'}
                            name={Icons.MaterialCommunityIcons.typewriter}
                            size={18}
                            color={colors.primary}
                        />
                        <Text style={[styles.dateStyle, { color: colors.gray }]}>
                            {newsFeed?.author}
                        </Text>
                    </View>
                    <View style={[styles.publishAtStyle, { flex: 1, marginLeft: 5 }]}>
                        <Icon
                            type={'material-community'}
                            name={Icons.MaterialCommunityIcons.time}
                            size={18}
                            color={colors.primary}
                        />
                        <Text style={[styles.dateStyle, { color: colors.gray }]}>
                            {moment(newsFeed?.publishedAt).format('MMM D YYYY')}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.contentStyle}>
                <Text style={[styles.desTextStyle, { color: colors.text }]}>
                    {newsFeed?.description}
                </Text>
                <Text style={[styles.contentTextStyle, { color: colors.gray }]}>
                    {newsFeed?.content}
                </Text>
            </View>
        </ScrollView>
    );
};

export default NewsDetails;