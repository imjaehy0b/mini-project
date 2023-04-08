import Tile from "../object/tile.js";
import Wall from "../object/wall.js";
import Box from "../object/box.js";
import Hole from "../object/hole.js";

export default
    class Map {
    #map1d
    #map2d
    #mapBlocks
    #boxWord
    #holeWord
    #holeArray
    #boxArray
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

        this.#boxWord = ["entity", "object"];
        this.#holeWord = [
            { key: "개체",
              value: "entity", 
            },
            { key: "객체",
              value: "object", 
            }
        ];
        this.#holeArray = [];
        this.#mapBlocks = this.#map2d.make2dBlockArray(this.#boxWord, this.#holeWord, this.#holeArray);
        this.#boxArray = []; // 박스가 구멍에 들어가면 구멍이 들어가 있을 배열 
    }

    detectCollisionWith(player) {
        let x = player.x;
        let y = player.y;
        let direction = player.direction;

        let block = this.#mapBlocks[y][x];
        if (block instanceof Box) {
            if (block.inHole) {
                player.resetPosition();
                return;
            }

            let hasObstacle = this.checkObstaclesAround(player);
            let canBeMoved = (!hasObstacle.upperSide && direction.up)
                || (!hasObstacle.underSide && direction.down)
                || (!hasObstacle.leftSide && direction.left)
                || (!hasObstacle.rightSide && direction.right);
            
            if (canBeMoved) {
                this.changeBoxPosition(x, y, direction);
            } else {
                player.resetPosition();
            }
        } else if (block instanceof Wall) {
            player.resetPosition();
        }
    }

    changeBoxPosition(x, y, direction) {
        let boxInHole = this.#mapBlocks[y][x].inHole;
        if (boxInHole) {
            return;
        }

        if (direction.up) {
            let box = this.#mapBlocks[y][x];
            let upperBlock = this.#mapBlocks[y-1][x];

            if (upperBlock instanceof Hole) {
                this.#boxArray.push(box);
                box.inHole = true;
            }

            // mapBlocks에서 box의 위치를 한 칸 위로 옮기고 그 자리를 타일로 대체
            box.setPosition(x, y-1); 
            this.#mapBlocks[y-1][x] = box;
            this.#mapBlocks[y][x] = new Tile(x, y);

        } else if (direction.down) {
            let box = this.#mapBlocks[y][x];
            let underBlock = this.#mapBlocks[y+1][x];

            if (underBlock instanceof Hole) {
                this.#boxArray.push(box);
                box.inHole = true;
           }

            // mapBlocks에서 box의 위치를 한 칸 밑으로 옮기고 그 자리를 타일로 대체 
            box.setPosition(x, y+1);
            this.#mapBlocks[y+1][x] = box;
            this.#mapBlocks[y][x] = new Tile(x, y);

        } else if (direction.left) {
            let box = this.#mapBlocks[y][x];
            let leftBlock = this.#mapBlocks[y][x-1];
            
            if (leftBlock instanceof Hole) {
                this.#boxArray.push(box);
                box.inHole = true;
            } 
            
            // mapBlocks에서 box의 위치를 한 칸 왼쪽으로 옮기고 그 자리를 타일로 대체 
            box.setPosition(x-1, y);
            this.#mapBlocks[y][x-1] = box;
            this.#mapBlocks[y][x] = new Tile(x, y);

        } else if (direction.right) {
            let box = this.#mapBlocks[y][x];
            let rightBlock = this.#mapBlocks[y][x+1];

            if (rightBlock instanceof Hole) {
                this.#boxArray.push(box);
                box.inHole = true;
            } 

            // mapBlocks에서 box의 위치를 한 칸 왼쪽으로 옮기고 그 자리를 타일로 대체
            box.setPosition(x+1, y);
            this.#mapBlocks[y][x+1] = box;
            this.#mapBlocks[y][x] = new Tile(x, y);
        }
    }

    checkObstaclesAround(player) {
        let x = player.x;
        let y = player.y;

        let result = {
            upperSide: (this.#mapBlocks[y-1][x] instanceof Wall || this.#mapBlocks[y-1][x] instanceof Box) ? true : false,
            underSide: (this.#mapBlocks[y+1][x] instanceof Wall || this.#mapBlocks[y+1][x] instanceof Box) ? true : false,
            leftSide: (this.#mapBlocks[y][x-1] instanceof Wall || this.#mapBlocks[y][x-1] instanceof Box) ? true : false,
            rightSide: (this.#mapBlocks[y][x+1] instanceof Wall || this.#mapBlocks[y][x+1] instanceof Box) ? true : false,
        }

        return result;
    }
    
    checkBoxInHoleAround(player) {
        let x = player.x;
        let y = player.y;

        let result = {
            upperSide: (this.#mapBlocks[y-1][x] instanceof Box && this.#mapBlocks[y-1][x].inHole) ? true : false,
            underSide: (this.#mapBlocks[y+1][x] instanceof Box && this.#mapBlocks[y+1][x].inHole) ? true : false,
            leftSide: (this.#mapBlocks[y][x-1] instanceof Box && this.#mapBlocks[y][x-1].inHole) ? true : false,
            rightSide: (this.#mapBlocks[y][x+1] instanceof Box && this.#mapBlocks[y][x+1].inHole) ? true : false,
        }

        return result;
    }

    isInHole(player) {
        let x = player.x;
        let y = player.y;

        if (this.#mapBlocks[y][x] instanceof Hole) {
            return true;
        } 

        return false;
    }

    takeOutBoxFromHole(existDirection, x, y) { 
        let block = this.#mapBlocks[y][x];
        if (block instanceof Hole) {
            return;
        }

        let box;
        switch (existDirection) {
            case "up":
                box = this.#mapBlocks[y-1][x];
                box.setPosition(x, y);
                box.inHole = false;
                this.#mapBlocks[y][x] = box;

                for (let hole of this.#holeArray) {
                    if (hole.x == x && hole.y == y-1) {
                        this.#mapBlocks[y-1][x] = hole;
                    }
                }

                break;
            case "down":
                box = this.#mapBlocks[y+1][x];
                box.setPosition(x, y);
                box.inHole = false;
                this.#mapBlocks[y][x] = box;

                // of 로 수정 in, of의 차이 알아내기
                for (let hole of this.#holeArray) {
                    if (hole.x == x && hole.y == y+1) {
                        this.#mapBlocks[y+1][x] = hole;
                    }
                }

                break;
            case "left":
                box = this.#mapBlocks[y][x-1];
                box.setPosition(x, y);
                box.inHole = false;
                this.#mapBlocks[y][x] = box;

                for (let hole of this.#holeArray) {
                    if (hole.x == x-1 && hole.y == y) {
                        this.#mapBlocks[y][x-1] = hole;
                    }
                }

                break;
            case "right":
                box = this.#mapBlocks[y][x+1];
                box.setPosition(x, y);
                box.inHole = false;
                this.#mapBlocks[y][x] = box;

                for (let hole of this.#holeArray) {
                    if (hole.x == x+1 && hole.y == y) {
                        this.#mapBlocks[y][x+1] = hole;
                    }
                }

                break;
        }
    }

    checkAnswer() {
        for (let box of this.#boxArray) {
            for (let hole of this.#holeArray) {
                if (hole.x == box.x && hole.y == box.y) {
                    if (box.key == hole.wordValue) {

                    }
                }

            }
        }
    }

    draw(ctx) {
        this.#mapBlocks.forEach((blocks) => {
            blocks.forEach((block) => {
                block.draw(ctx);
            })
        })
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

Array.prototype.make2dBlockArray = function (boxWord, holeWord) {
    let arr2d = [];
    let boxWordIndex = 0;
    let holeWordIndex = 0;

    this.forEach((row, y) => {
        let arr1d = [];

        row.forEach((column, x) => {
            switch (column) {
                case 0:
                    arr1d.push(new Tile(x, y));
                    break;
                case 1:
                    arr1d.push(new Wall(x, y));
                    break;
                case 2:
                    let box = new Box(x, y, boxWord[boxWordIndex++]);
                    arr1d.push(box);
                    // boxArr.push(box);
                    break;
                case 3:
                    let hole = new Hole(x, y, holeWord[holeWordIndex++]);
                    arr1d.push(hole);
                    // holeArr.push(hole);
                    break;
            }
        })

        arr2d.push(arr1d);
    })

    return arr2d;
}
