import Tile from "../object/tile.js";
import Wall from "../object/wall.js";
import Box from "../object/box.js";
import Hole from "../object/hole.js";

export default
    class Map {
    #map1d
    #map2d

    constructor() {
        this.#map1d = [
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 2, 0, 0, 2, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 3, 3, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 1, 1
        ];

        this.#map2d = this.#map1d.parse2d();
    }

    draw(ctx) {
        this.#map2d.forEach((row, y) => {
            row.forEach((column, x) => {
                let tempBlock;

                switch (column) {
                    case 0:
                        tempBlock = new Tile(x * 64, y * 64);
                        tempBlock.draw(ctx);
                        break;
                    case 1:
                        tempBlock = new Wall(x * 64, y * 64);
                        tempBlock.draw(ctx);
                        break;
                    case 2:
                        tempBlock = new Box(x * 64, y * 64);
                        tempBlock.draw(ctx);
                        break;
                    case 3:
                        tempBlock = new Hole(x * 64, y * 64);
                        tempBlock.draw(ctx);
                        break;
                    case 9:
                        tempBlock = new Box(x * 64, y * 64);
                        tempBlock.draw(ctx);
                        break;
                }
            })
        })
    }

    checkCollisionWith(player) {
        console.log("check collision");
        let position = player.position;
        let direction = player.direction;
        let value = this.#map2d[position.y][position.x];

        switch (value) {
            case 1:
                player.correctPosition();
                break;

            case 2:
                let hasObstacle = this.checkObstacles(player);

                if ((!hasObstacle.upperSide && direction.up)
                    || (!hasObstacle.underSide && direction.down)
                    || (!hasObstacle.leftSide && direction.left)
                    || (!hasObstacle.rightSide && direction.right))
                    this.changeBoxPosition(direction, position);
                else
                    player.correctPosition();
                break;

            case 9:
                player.correctPosition();
                break;
        }
    }

    checkBoxInHoleAround(player) {
        let x = player.position.x;
        let y = player.position.y;

        let result = {
            upperSide: (this.#map2d[y - 1][x] == 9) ? true : false,
            underSide: (this.#map2d[y + 1][x] == 9) ? true : false,
            leftSide: (this.#map2d[y][x - 1] == 9) ? true : false,
            rightSide: (this.#map2d[y][x + 1] == 9) ? true : false,
        }

        return result;
    }

    checkObstacles(player) {
        let x = player.position.x;
        let y = player.position.y;

        let result = {
            upperSide: (this.#map2d[y - 1][x] == 1 || this.#map2d[y - 1][x] == 2) ? true : false,
            underSide: (this.#map2d[y + 1][x] == 1 || this.#map2d[y + 1][x] == 2) ? true : false,
            leftSide: (this.#map2d[y][x - 1] == 1 || this.#map2d[y][x - 1] == 2) ? true : false,
            rightSide: (this.#map2d[y][x + 1] == 1 || this.#map2d[y][x + 1] == 2) ? true : false,
        }

        return result;
    }

    takeOutBoxFromHole(existDirection, player) {
        let x = player.position.x;
        let y = player.position.y;

        switch (existDirection) {
            case "up":
                this.#map2d[y - 1][x] = 3;
                this.#map2d[y][x] = 2;
                break;
            case "down":
                this.#map2d[y + 1][x] = 3;
                this.#map2d[y][x] = 2;
                break;
            case "left":
                this.#map2d[y][x - 1] = 3;
                this.#map2d[y][x] = 2;
                break;
            case "right":
                this.#map2d[y][x + 1] = 3;
                this.#map2d[y][x] = 2;
                break;
        }
    }

    changeBoxPosition(playerDirection, position) {
        let x = position.x;
        let y = position.y;

        if (playerDirection.up) {
            if (this.#map2d[y - 1][x] == 3) {
                this.#map2d[y][x] = 0;
                this.#map2d[y - 1][x] = 9;
            } else {
                this.#map2d[y][x] = 0;
                this.#map2d[y - 1][x] = 2;
            }
        } else if (playerDirection.down) {
            if (this.#map2d[y + 1][x] == 3) {
                this.#map2d[y][x] = 0;
                this.#map2d[y + 1][x] = 9;
            } else {
                this.#map2d[y][x] = 0;
                this.#map2d[y + 1][x] = 2;
            }
        } else if (playerDirection.left) {
            if (this.#map2d[y][x - 1] == 3) {
                this.#map2d[y][x] = 0;
                this.#map2d[y][x - 1] = 9;
            } else {
                this.#map2d[y][x] = 0;
                this.#map2d[y][x - 1] = 2;
            }
        } else if (playerDirection.right) {
            if (this.#map2d[y][x + 1] == 3) {
                this.#map2d[y][x] = 0;
                this.#map2d[y][x + 1] = 9;
            } else {
                this.#map2d[y][x] = 0;
                this.#map2d[y][x + 1] = 2;
            }
        }
    }

    get map2d() {
        return this.#map2d;
    }

}

Array.prototype.parse2d = function () {
    let array2d = [];

    for (let i = 0; i < this.length; i += 8) {
        array2d.push(this.slice(i, i + 8));
    }

    return array2d;
}
