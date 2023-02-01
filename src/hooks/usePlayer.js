import { useState, useCallback } from 'react';
import { STAGE_WIDTH } from '../gamehelpers';

import { TETROMINOS, randomTetromino } from '../tetrominus';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x:0, y:0},
        tetromino: TETROMINOS[0].shape,
        collided: false
    }); 
    
    const updatePlayerPos = ({ x, y, collided }) => {
        console.log(`x:${x} y${y}`)
        setPlayer(prev => ({
            pos: {x: (prev.pos.x += x), y: (prev.pos.y += y)},
            tetromino: prev.tetromino,
            collided: collided,

        }))
    }

    const resetPlayer = useCallback(() => {
        console.log("reset-player")
        setPlayer({
            pos: {x: STAGE_WIDTH / 2 - 2, y: 0},
            tetromino: randomTetromino().shape,
            collided: false,
        })
    }, []);

    return [player, updatePlayerPos, resetPlayer];
};