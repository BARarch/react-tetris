import { useState } from 'react';
import { createStage } from '../gamehelpers'

export const useStage = () => {
    const [stage, setStage] = useState(createStage());
    return [stage, setStage];
}