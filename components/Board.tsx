// components/Board.tsx
import React from 'react';
import { Dimensions, View } from 'react-native';
import { styles } from '../styles';
import { Hex as HexType } from '../types/types';
import Hex from './Hex';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface BoardProps {
    layout: HexType[];
}

const Board: React.FC<BoardProps> = ({ layout }) => {
    // Calculate hex size based on screen width and board type
    const isStandard = layout.length <= 19;
    const hexSize = isStandard ? SCREEN_WIDTH / 9 : SCREEN_WIDTH / 12;

    // Convert axial/cube coordinates to pixel coordinates
    const cubeToPixel = (x: number, y: number, z: number) => {
        const size = hexSize;
        const hexWidth = size * 2;
        const hexHeight = size * Math.sqrt(3);

        // Offset coordinates
        const col = x + (z - (z % 2)) / 2;
        const row = z;

        const pixelX = col * hexWidth * 0.75;
        const pixelY = row * hexHeight * 0.5;

        return { pixelX, pixelY };
    };

    // Find bounds to center the board
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    const positionedHexes = layout.map(hex => {
        const { pixelX, pixelY } = cubeToPixel(...hex.coords);
        minX = Math.min(minX, pixelX);
        maxX = Math.max(maxX, pixelX);
        minY = Math.min(minY, pixelY);
        maxY = Math.max(maxY, pixelY);
        return { ...hex, pixelX, pixelY };
    });

    // Calculate board dimensions and center offset
    const boardWidth = maxX - minX + hexSize * 2;
    const boardHeight = maxY - minY + hexSize * Math.sqrt(3);
    const offsetX = (SCREEN_WIDTH - boardWidth) / 2 - minX;
    const offsetY = hexSize; // Top padding

    return (
        <View style={[styles.board, { height: boardHeight + hexSize * 2 }]}>
            {positionedHexes.map((hex) => (
                <View
                    key={hex.id}
                    style={[
                        styles.hexContainer,
                        {
                            position: 'absolute',
                            left: hex.pixelX + offsetX,
                            top: hex.pixelY + offsetY,
                            zIndex: 1000 - Math.abs(hex.coords[0]) - Math.abs(hex.coords[1]) - Math.abs(hex.coords[2])
                        }
                    ]}
                >
                    <Hex
                        resource={hex.resource}
                        number={hex.number}
                        size={hexSize}
                    />
                </View>
            ))}
        </View>
    );
};

export default Board;