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
    const hexSize = isStandard ? SCREEN_WIDTH / 9.5 : SCREEN_WIDTH / 12;

    // Pointy-topped hex conversion
    const cubeToPixel = (x: number, y: number, z: number) => {
        const q = x;
        const r = z;
        const size = hexSize;
        const pixelX = size * Math.sqrt(3) * (q + r / 2);
        const pixelY = size * 3 / 2 * r;
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

    // Calculate board dimensions
    const boardWidth = maxX - minX + hexSize * Math.sqrt(3);
    const boardHeight = maxY - minY + hexSize * 2;

    // Improved centering calculations
    const offsetX = (SCREEN_WIDTH - boardWidth) / 2 - minX + (isStandard ? hexSize * 0.5 : 0);
    const offsetY = (SCREEN_WIDTH * 0.9 - boardHeight) / 2 - minY;

    return (
        <View style={[styles.board, {
            width: boardWidth,
            height: boardHeight,

            marginTop: -hexSize * 0.5,
            marginLeft: -hexSize * 1.4
        }]}>
            {positionedHexes.map((hex) => (
                <View
                    key={hex.id}
                    style={[
                        styles.hexContainer,
                        {
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