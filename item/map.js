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
    #tempHoleArray
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
            { "개체": "entity" },
            { "객체": "object" },
        ];

        this.#mapBlocks = this.#map2d.make2dBlockArray(this.#boxWord, this.#holeWord);
        this.#tempHoleArray = []; // 박스가 구멍에 들어가면 구멍이 들어가 있을 배열 
    }

    draw(ctx) {
        this.#mapBlocks.forEach((blocks) => {
            blocks.forEach((block) => {
                block.draw(ctx);
            })
        })
    }

    checkPlayerInHole(player) {
        let x = player.position.x;
        let y = player.position.y;

        if (this.#map2d[y][x] == 3) {
            return true;
        } 

        return false;
    }

    checkCollisionWith(player) {
        let position = player.position;
        let direction = player.direction;
        let block = this.#mapBlocks[position.y][position.x];

        if (block instanceof Box) {
            if (block.inHole) {
                player.correctPosition();
                return;
            }

            let hasObstacle = this.checkObstacles(player);
            let canBeMoved = (!hasObstacle.upperSide && direction.up)
                || (!hasObstacle.underSide && direction.down)
                || (!hasObstacle.leftSide && direction.left)
                || (!hasObstacle.rightSide && direction.right);
            
            if (canBeMoved) {
                this.changeBoxPosition(direction, position);
            } else {
                player.correctPosition();
            }
        } else if (block instanceof Wall) {
            player.correctPosition();
        }

        // switch (value) {
        //     case 1:
        //         player.correctPosition();
        //         break;

        //     case 2:
        //         let hasObstacle = this.checkObstacles(player);

        //         if ((!hasObstacle.upperSide && direction.up)
        //             || (!hasObstacle.underSide && direction.down)
        //             || (!hasObstacle.leftSide && direction.left)
        //             || (!hasObstacle.rightSide && direction.right))
        //             this.changeBoxPosition(direction, position);
        //         else
        //             player.correctPosition();
        //         break;

        //     case 9:
        //         player.correctPosition();
        //         break;
        // }
    }

    checkBoxInHoleAround(player) {
        let x = player.position.x;
        let y = player.position.y;

        let result = {
            upperSide: (this.#mapBlocks[y-1][x] instanceof Box && this.#mapBlocks[y-1][x].inHole) ? true : false,
            underSide: (this.#mapBlocks[y+1][x] instanceof Box && this.#mapBlocks[y+1][x].inHole) ? true : false,
            leftSide: (this.#mapBlocks[y][x-1] instanceof Box && this.#mapBlocks[y][x-1].inHole) ? true : false,
            rightSide: (this.#mapBlocks[y][x+1] instanceof Box && this.#mapBlocks[y][x+1].inHole) ? true : false,
        }

        return result;
    }

    checkObstacles(player) {
        let x = player.position.x;
        let y = player.position.y;

        let result = {
            upperSide: (this.#mapBlocks[y-1][x] instanceof Wall || this.#mapBlocks[y-1][x] instanceof Box) ? true : false,
            underSide: (this.#mapBlocks[y+1][x] instanceof Wall || this.#mapBlocks[y+1][x] instanceof Box) ? true : false,
            leftSide: (this.#mapBlocks[y][x-1] instanceof Wall || this.#mapBlocks[y][x-1] instanceof Box) ? true : false,
            rightSide: (this.#mapBlocks[y][x+1] instanceof Wall || this.#mapBlocks[y][x+1] instanceof Box) ? true : false,
        }

        return result;
    }

    takeOutBoxFromHole(existDirection, player) {
        // 모든 object 및 item의 position x, y 2차원 배열에서의 index로 표현
        // 그려줄 때만 64를 곱해줌 
        // this.#tempHoleArray는 make2dBlockArray에서 애초에 넣어줌 

        let x = player.position.x;
        let y = player.position.y;
        let box;

        if (this.#mapBlocks[y][x] instanceof Hole) {
            return;
        }
        // 현재 말이 안 되는 상태 
        switch (existDirection) {
            case "up":
                this.#map2d[y-1][x] = 3;
                this.#map2d[y][x] = 2;

                box = this.#mapBlocks[y-1][x];
                
                for (let i in this.#tempHoleArray) {
                    let hole = this.#tempHoleArray[i];
                    let holePositionX = hole.positionX;
                    let holePositionY = hole.positionY;
                    if (holePositionX == x*64 && holePositionY == (y-1)*64) {
                        this.#mapBlocks[y-1][x] = hole;
                    }
                }

                box.setPosition(x*64, y*64);
                box.inHole = false;
                this.#mapBlocks[y][x] = box;
                break;
            case "down":
                this.#map2d[y+1][x] = 3;
                this.#map2d[y][x] = 2;

                box = this.#mapBlocks[y+1][x];

                for (let i in this.#tempHoleArray) {
                    let hole = this.#tempHoleArray[i];
                    let holePositionX = hole.positionX;
                    let holePositionY = hole.positionY;
                    if (holePositionX == x*64 && holePositionY == (y+1)*64) {
                        this.#mapBlocks[y+1][x] = hole;
                    }
                }

                box.setPosition(x*64, y*64);
                box.inHole = false;
                this.#mapBlocks[y][x] = box;
                break;
            case "left":
                this.#map2d[y][x-1] = 3;
                this.#map2d[y][x] = 2;

                box = this.#mapBlocks[y][x-1];
                for (let i in this.#tempHoleArray) {
                    let hole = this.#tempHoleArray[i];
                    let holePositionX = hole.positionX;
                    let holePositionY = hole.positionY;
                    if (holePositionX == (x-1)*64 && holePositionY == y*64) {
                        this.#mapBlocks[y][x-1] = hole;
                    }
                }

                box.setPosition(x*64, y*64);
                box.inHole = false;
                this.#mapBlocks[y][x] = box;
                break;
            case "right":
                this.#map2d[y][x+1] = 3;
                this.#map2d[y][x] = 2;

                box = this.#mapBlocks[y][x+1];

                for (let i in this.#tempHoleArray) {
                    let hole = this.#tempHoleArray[i];
                    let holePositionX = hole.positionX;
                    let holePositionY = hole.positionY;
                    if (holePositionX == (x+1)*64 && holePositionY == y*64) {
                        this.#mapBlocks[y][x+1] = hole;
                    }
                }

                box.setPosition(x*64, y*64);
                box.inHole = false;
                this.#mapBlocks[y][x] = box;
                break;
        }
    }

    changeBoxPosition(playerDirection, position) {
        let x = position.x;
        let y = position.y;

        if (this.#mapBlocks[y][x].inHole) {
            return;
        }

        if (playerDirection.up) {
            if (this.#map2d[y-1][x] == 3) {
                // hole 객체를 임시 배열에 원래 있던 좌표를 통해 저장
                this.#tempHoleArray.push(this.#mapBlocks[y-1][x]);
                this.#mapBlocks[y][x].inHole = true;
            }
            // map2d 상의 숫자를 바꿔줌 
            this.#map2d[y-1][x] = 2;
            this.#map2d[y][x] = 0;

            // mapBlocks에서 box의 위치를 한 칸 위로 옮기고 그 자리를 타일로 대체 
            let box = this.#mapBlocks[y][x];
            box.setPosition(x*64, (y-1)*64);
            this.#mapBlocks[y-1][x] = box;
            this.#mapBlocks[y][x] = new Tile(x*64, y*64);
        } else if (playerDirection.down) {
            if (this.#map2d[y+1][x] == 3) {
                // hole 객체를 임시 배열에 원래 있던 좌표를 통해 저장
                this.#tempHoleArray.push(this.#mapBlocks[y+1][x]);
                this.#mapBlocks[y][x].inHole = true;  
            }
            // map 2d 상의 숫자를 바꿔줌 
            this.#map2d[y+1][x] = 2;
            this.#map2d[y][x] = 0;
            // mapBlocks에서 box의 위치를 한 칸 밑으로 옮기고 그 자리를 타일로 대체 
            // 요기가 문제인듯

            let box = this.#mapBlocks[y][x];
            box.setPosition(x*64, (y+1)*64);
            this.#mapBlocks[y+1][x] = box;
            this.#mapBlocks[y][x] = new Tile(x*64, y*64);
        } else if (playerDirection.left) {
            if (this.#map2d[y][x-1] == 3) {
                this.#tempHoleArray.push(this.#mapBlocks[y][x-1]);
                this.#mapBlocks[y][x].inHole = true;  
            } 

            // map 2d 상의 숫자를 바꿔W줌 
            this.#map2d[y][x-1] = 2;
            this.#map2d[y][x] = 0;
            
            // mapBlocks에서 box의 위치를 한 칸 왼쪽으로 옮기고 그 자리를 타일로 대체 
            let box = this.#mapBlocks[y][x];
            box.setPosition((x-1)*64, y*64);
            this.#mapBlocks[y][x-1] = box;
            this.#mapBlocks[y][x] = new Tile(x*64, y*64);
        } else if (playerDirection.right) {
            if (this.#map2d[y][x+1] == 3) {
                this.#tempHoleArray.push(this.#mapBlocks[y][x+1]); 
                this.#mapBlocks[y][x].inHole = true;   
            } 

            // map 2d 상의 숫자를 바꿔줌aa
            this.#map2d[y][x] = 0;
            this.#map2d[y][x+1] = 2;

            // mapBlocks에서 box의 위치를 한 칸 왼쪽으로 옮기고 그 자리를 타일로 대체 
            let box = this.#mapBlocks[y][x];
            box.setPosition((x+1)*64, y*64);
            this.#mapBlocks[y][x+1] = box;
            this.#mapBlocks[y][x] = new Tile(x*64, y*64);
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

Array.prototype.make2dBlockArray = function (boxWord, holeWord) {
    let arr2d = [];
    let boxWordIndex = 0;
    let holeWordIndex = 0;

    this.forEach((row, y) => {
        let arr1d = [];

        row.forEach((column, x) => {
            switch (column) {
                case 0:
                    arr1d.push(new Tile(x * 64, y * 64));
                    break;
                case 1:
                    arr1d.push(new Wall(x * 64, y * 64));
                    break;
                case 2:
                    arr1d.push(new Box(x * 64, y * 64, boxWord[boxWordIndex++]));
                    break;
                case 3:
                    arr1d.push(new Hole(x * 64, y * 64, holeWord[holeWordIndex++]));
                    break;
                // case 9:
                //     arr1d.push(new Box(x*64, y*64));
                //     break;
            }
        })

        arr2d.push(arr1d);
    })

    return arr2d;
}
