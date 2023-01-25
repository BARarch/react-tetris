import React, { useState }  from "react";

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
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player] = usePlayer();
    const [stage, setStage] = useStage(player)

    console.log('re-render')
    return (
        <StyledTectrisWrapper>
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
                    <StartButton />
                </aside>
            </StyledTectris>
        </StyledTectrisWrapper>
    )
};

export default Tectris; 