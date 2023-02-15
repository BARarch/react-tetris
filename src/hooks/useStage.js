import { useEffect, useState } from 'react';
import { createStage } from '../gamehelpers';

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());

    useEffect(() => {
        console.log('effect')
        const updateStage = prevStage => {
            // Flush the stage    
            const newStage = prevStage.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );
            

            // Draw the Tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });
            if (player.collided) {
              resetPlayer()
            }
            //console.log(`posX:${player.pos.x} posY:${player.pos.y}`)
            //console.log("New Stage")
            return newStage;
        }
        console.log("Set Stage")
        setStage(prev => updateStage(prev));
        
    }, [player, resetPlayer]); 

    return [stage, setStage];
}