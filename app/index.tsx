// App.tsx
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import AppHeader from '../components/AppHeader';
import Board from '../components/Board';
import Controls from '../components/Controls';
import { BoardType, Hex } from '../types/types';
import { generateExtendedBoard, generateStandardBoard } from '../utils/boardGenerator';

export default function App() {
  const [boardType, setBoardType] = useState<BoardType>('standard');
  const [boardLayout, setBoardLayout] = useState<Hex[]>(generateStandardBoard());

  const generateNewBoard = () => {
    const generator = boardType === 'standard' ? generateStandardBoard : generateExtendedBoard;
    setBoardLayout(generator());
  };

  const toggleBoardType = () => {
    const newType: BoardType = boardType === 'standard' ? 'extended' : 'standard';
    setBoardType(newType);
    const generator = newType === 'standard' ? generateStandardBoard : generateExtendedBoard;
    setBoardLayout(generator());
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <Controls
        onGenerate={generateNewBoard}
        onToggleBoard={toggleBoardType}
        boardType={boardType}
      />
      <View style={styles.boardContainer}>
        <Board layout={boardLayout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});