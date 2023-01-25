import React from "react";

import { createStage } from '../gamehelpers'
import { StyledTectrisWrapper, StyledTectris } from './styles/StyledTectris'

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tectris = () => {
 
    return (
        <StyledTectrisWrapper>
            <StyledTectris>
                <Stage stage={ createStage() } />
                <aside>
                    <div>
                        <Display text="Score" />
                        <Display text="Rows" />
                        <Display text="Level" />    
                    </div>
                    <StartButton />
                </aside>
            </StyledTectris>
        </StyledTectrisWrapper>
    )
};

export default Tectris; 