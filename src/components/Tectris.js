import React from "react";

import { createStage } from '../gamehelpers'

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tectris = () => {
 
    return (
        <div>
            <Stage stage={ createStage() } />
            <aside>
                <div>
                    <Display text="Score" />
                    <Display text="Rows" />
                    <Display text="Level" />    
                </div>
                <StartButton />
            </aside>
        </div>
    )
};

export default Tectris; 