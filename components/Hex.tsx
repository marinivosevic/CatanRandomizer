// components/Hex.tsx
import React from 'react';
import { Image, StyleProp, Text, View, ViewStyle } from 'react-native';
import { styles } from '../styles';
import { Resource } from '../types/types';

interface HexProps {
    resource: Resource;
    number: number | null;
    size?: number;
}

const Hex: React.FC<HexProps> = ({ resource, number, size = 60 }) => {
    const resourceImages = {
        brick: require('../assets/images/hill.png'),
        grain: require('../assets/images/field.png'),
        lumber: require('../assets/images/forest.png'),
        ore: require('../assets/images/mountain.png'),
        wool: require('../assets/images/pasture.png'),
        desert: require('../assets/images/desert.png'),
    };

    const hexStyle: StyleProp<ViewStyle> = {
        width: size * 2,
        height: size * Math.sqrt(3),
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <View style={[styles.hexagon, hexStyle]}>
            <Image
                source={resourceImages[resource]}
                style={{ width: size * 1.5, height: size * 1.5 }}
                resizeMode="contain"
            />
            {number && (
                <View style={styles.numberToken}>
                    <Text style={styles.numberText}>{number}</Text>
                </View>
            )}
        </View>
    );
};

export default Hex;