// components/Controls.tsx
import React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../styles';
import { BoardType } from '../types/types';

interface ControlsProps {
    onGenerate: () => void;
    onToggleBoard: () => void;
    boardType: BoardType;
}

const Controls: React.FC<ControlsProps> = ({ onGenerate, onToggleBoard, boardType }) => {
    return (
        <View style={styles.controls}>
            <Button
                title="Generate New Board"
                onPress={onGenerate}
                color="#4a6741"
            />
            <View style={styles.toggleContainer}>
                <Text style={styles.toggleText}>
                    Current: {boardType === 'standard' ? 'Standard' : 'Extended'}
                </Text>
                <Button
                    title={`Switch to ${boardType === 'standard' ? 'Extended' : 'Standard'}`}
                    onPress={onToggleBoard}
                    color="#8b4513"
                />
            </View>
        </View>
    );
};

export default Controls;