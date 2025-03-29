import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { CustomTheme } from '@src/utils/theme';
import styles from './styles';

interface SectionHeaderProps {
    rightAction?: () => void;
    containerStyle: any;
    title: string
};

const SectionHeader: React.FC<SectionHeaderProps> = React.memo(({ rightAction, title, containerStyle }) => {

    const { colors } = useTheme() as CustomTheme;

    return (
        <View style={[styles.containerStyle, containerStyle]}>
            <Text style={[styles.titleStyle, { color: colors.text }]}>
                {title}
            </Text>
            {rightAction && (
                <TouchableOpacity activeOpacity={1} style={styles.tOpacity} onPress={rightAction}>
                    <Text style={[styles.titleStyle, { color: colors.primary }]}>
                        {'View All'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
});

export default SectionHeader;