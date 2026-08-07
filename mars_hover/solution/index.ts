interface MarsRoverI {
    execute(command: string): string
}

const DIRECTIONS = ["N", "E", "S", "W"];

export const MarsRover = (): MarsRoverI  => {
    let position = {
        x: 0,
        y: 0,
        direction: "N"
    }

    const rotateLeft = () => {
        const currentPositionIndex = DIRECTIONS.indexOf(position.direction);
        const nextPositionIndex = currentPositionIndex - 1 

        return DIRECTIONS[nextPositionIndex < 0 ? 3 : nextPositionIndex];
    }

    const rotateRight = () => {
        const currentPositionIndex = DIRECTIONS.indexOf(position.direction);
        const nextPositionIndex = currentPositionIndex + 1;

        return DIRECTIONS[nextPositionIndex > 3 ? 0 : nextPositionIndex];
    }

    const moveForward = () => {
        let nextX = position.x;
        let nextY = position.y;

        if (position.direction === "N") {
            nextY += 1;
        } else if (position.direction === "E") {
            nextX += 1;
        } else if (position.direction === "S") {
            nextY -= 1;
        } else if (position.direction === "W") {
            nextX -= 1;
        }

        //checker
        if (nextX < 0) {
            nextX = 9;
        }
        if (nextX > 9) {
            nextX = 0;
        }
        if (nextY < 0) {
            nextY = 9;
        }
        if (nextY > 9) {
            nextY = 0;
        }

        return {
            x: nextX,
            y: nextY,
            direction: position.direction
        }
    }

    const execute = (commands: string) => {
        for(let command of commands) {
            if (command === "R") {
                position.direction = rotateRight();
            }

            if (command === "L") {
                position.direction = rotateLeft();
            }

            if (command === "M") {
                position = moveForward();
            }
        }

        return `${position.x}:${position.y}:${position.direction}`;
    }

    return { execute }
}