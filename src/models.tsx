export type Direction = 'N' | 'E' | 'S' | 'W';

export interface Position {
    x: number;
    y: number;
    direction: Direction;
    }

    export class Mower {
    position: Position;

    constructor(position: Position) {
        this.position = position;
    }

    move(instruction: string, lawn: Lawn) {
        switch (instruction) {
        case 'L':
            this.turnLeft();
            break;
        case 'R':
            this.turnRight();
            break;
        case 'F':
            this.goForward(lawn);
            break;
        }
    }

    turnLeft() {
        switch (this.position.direction) {
        case 'N':
            this.position.direction = 'W';
            break;
        case 'W':
            this.position.direction = 'S';
            break;
        case 'S':
            this.position.direction = 'E';
            break;
        case 'E':
            this.position.direction = 'N';
            break;
        }
    }

    turnRight() {
        switch (this.position.direction) {
        case 'N':
            this.position.direction = 'E';
            break;
        case 'E':
            this.position.direction = 'S';
            break;
        case 'S':
            this.position.direction = 'W';
            break;
        case 'W':
            this.position.direction = 'N';
            break;
        }
    }

    goForward(lawn: Lawn) {
        const position = { ...this.position };

        switch (position.direction) {
        case 'N':
            position.y++;
            break;
        case 'E':
            position.x++;
            break;
        case 'S':
            position.y--;
            break;
        case 'W':
            position.x--;
            break;
        }

        if (lawn.isPositionValid(position)) {
        this.position = position;
        }
    }
}

export class Lawn {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    isPositionValid(position: Position) {
        return position.x >= 0 && position.x <= this.width && position.y >= 0 && position.y <= this.height;
    }
}