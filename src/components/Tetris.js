import React, { useState }  from "react";
import { createStage, checkCollision } from '../gamehelpers';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris'

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage'

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
    console.log("re-define-states");

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    console.log("re-render");

    const movePlayer = dir => {
        
        if(!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 })
        }
    }

    const startGame = () => {
        // Reset everything
        console.log("Start Game")
        setStage(createStage());
        resetPlayer();
        setGameOver(false)
    }

    const drop = () => {
        if(!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false});
        } else {
            // Shape has either collided with the bottom of the stage or another shape
            // Merge the player shape into the stage and reset the player to a new shape
            if (player.pos.y < 1) {
                setGameOver(true);
                setDropTime(null)
            }

            updatePlayerPos({ x:0, y:0, collided:true})
        }
            
    }

    const dropPlayer = () => {
        drop(); 
    }

    const move = (e) => {
        //e.stopPropogation()
        
        const keyCode = e.keyCode;
        console.log(keyCode)
        //e.stopPropogation()
        
        if (!gameOver) {
            if (keyCode === 37) {
                console.log("Move LEFT");
                movePlayer(-1);
            } else if (keyCode === 39) {
                console.log("Move RIGHT");
                movePlayer(1);
            } else if (keyCode === 40) {
                console.log("DROP")
                dropPlayer();
            } else if (keyCode === 65) {
                playerRotate(stage, -1) // a for CCW
            } else if (keyCode === 83) {
                playerRotate(stage, 1) // b for CW
            }
        }
        e.preventDefault()
        

    }

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over"/>
                    ) : (
                    <div>
                        <Display text="Score" />
                        <Display text="Rows" />
                        <Display text="Level" />    
                    </div>
                    )}
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
};

export default Tetris; 