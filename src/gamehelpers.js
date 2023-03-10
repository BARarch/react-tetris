export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => 
                                    new Array(STAGE_WIDTH).fill([0, 'clear'])
                                )
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[y].length; x += 1) {
        //1. Check that we've collided with a real shape
            if (player.tetromino[y][x] !== 0) {
                if(
                // 2. Check that the move is within the height of the stage (y)
                    !stage[y + player.pos.y + moveY] ||

                // 3. Check that the move is within the width of the stage (x)
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||

                // 4. Check that the cell we're moving to isn't a cell from a shape set to 'clear'
                //    Shapes don't merge into or though one another
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear') {
                    return true;
                }

            }



        }
    }


}