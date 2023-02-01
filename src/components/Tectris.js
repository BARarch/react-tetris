import React, { useState }  from "react";
import { createStage } from '../gamehelpers';

// Styled Components
import { StyledTectrisWrapper, StyledTectris } from './styles/StyledTectris'

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage'

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tectris = () => {
    console.log("re-define-states");

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);

    console.log("re-render");

    const movePlayer = dir => {
        updatePlayerPos({ x: dir, y: 0 })
    }

    const startGame = () => {
        // Reset everything
        console.log("Start Game")
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, collided: false});
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
            }
        }
        e.preventDefault()
        

    }

    return (
        <StyledTectrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTectris>
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
            </StyledTectris>
        </StyledTectrisWrapper>
    )
};

export default Tectris; 