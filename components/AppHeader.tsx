// components/AppHeader.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';

const AppHeader: React.FC = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Catan Board Randomizer</Text>
        </View>
    );
};

export default AppHeader;