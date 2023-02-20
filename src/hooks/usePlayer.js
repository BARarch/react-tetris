import { useState, useCallback } from 'react';
import { checkCollision, STAGE_WIDTH } from '../gamehelpers';

import { TETROMINOS, randomTetromino } from '../tetrominus';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x:0, y:0},
        tetromino: TETROMINOS[0].shape,
        collided: false
    }); 

    const rotate = (matrix, dir) => {
        const trasposedMatrix = matrix.map((_, index) => matrix.map((col) => col[index])); // Transpose
        if (dir > 0 ) return trasposedMatrix.map((row) => row.reverse()); // CW
        return trasposedMatrix.reverse(); // CCW
    }

    const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x;
        let offset = 1;

        while(checkCollision(clonedPlayer, stage, { x:0, y:0})) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));

            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);  // Undo Rotate
                clonedPlayer.pos.x = pos;
                console.log("no rotate -- shape pinned")
                return;
            }
        }


        setPlayer(clonedPlayer);

    }
    
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

    return [player, updatePlayerPos, resetPlayer, playerRotate];
};