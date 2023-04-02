
export default class Player {
    constructor() {
        this.width = 64;
        this.height = 64;
        this.img = new Image();
        this.img.src = "../images/player.png";

        this.x = 3;
        this.y = 2;

        this.dx = 1;
        this.dy = 1;

        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false, 
        };
    }

    draw(ctx) { 
        ctx.drawImage(this.img, this.x*64, this.y*64, this.width, this.height);
    }

    update() {
        if (this.direction.up) {
            this.y -= this.dy;
            this.dy = 0;
        } else if (this.direction.down) {
            this.y += this.dy;
            this.dy = 0;
        } else if (this.direction.left) {
            this.x -= this.dx;
            this.dx = 0;
        } else if (this.direction.right) {
            this.x += this.dx;
            this.dx = 0;
        }
    }
    
    checkCollisionWith(map) {
        let mapArray = map.map2d;
        
        // mapArray.forEach((row, y) => {
        //     row.forEach((column ,x) => {
        //         if(column == 2) {
        //             console.log(x, y);
        //         }
        //     })
        // })
        // mapArray[2][3] = 0;
        // console.log(map.map2d[2][3]);
        console.log(this.x, this.y, mapArray[this.x][this.y]);

        if(mapArray[this.y][this.x] == 1) {
            if (this.direction.up) {
                this.y += 1;
            } else if (this.direction.down) {
                this.y -= 1;
            } else if (this.direction.left) {
                this.x += 1;
            } else if (this.direction.right) {
                this.x -= 1;
            }
        } else if(mapArray[this.y][this.x] == 2) {
            if (this.direction.up) {
                mapArray[this.y][this.x] = 0;
                mapArray[this.y-1][this.x] = 2;
            } else if (this.direction.down) {
                this.y -= 1;
            } else if (this.direction.left) {
                this.x += 1;
            } else if (this.direction.right) {
                this.x -= 1;
            }
        }
    }
    // checkCollisionsWithBoxes(boxes) {
    //     for (const box of boxes) {
    //         if (this.collidesWith(box)) {
    //             if (this.direction.up) {
    //                 box.y -= 5;
    //             } else if (this.direction.down) {
    //                 box.y += 5;
    //             } else if (this.direction.left) {
    //                 box.x -= 5;
    //             } else if (this.direction.right) {
    //                 box.x += 5;
    //             }
    //         }
    //     }
    // }

    // checkCollisionsWith(walls, boxes) {
    //     for (const wall of walls) {
    //         if (this.collidesWith(wall)) {
    //             if (this.direction.up) this.position.y = wall.y + wall.height;
    //             else if (this.direction.down) this.position.y = wall.y - this.height;
    //             else if (this.direction.left) this.position.x = wall.x + wall.width;
    //             else if (this.direction.right) this.position.x = wall.x - this.width;
    //         }
    //     }

    //     for (const box of boxes) {
    //         if (this.collidesWith(box)) {
    //             if (this.direction.up) {
    //                 box.y -= 5;
    //             } else if (this.direction.down) {
    //                 box.y += 5;
    //             } else if (this.direction.left) {
    //                 box.x -= 5;
    //             } else if (this.direction.right) {
    //                 box.x += 5;
    //             }
    //         }
    //     }
    // }

    // collidesWith(obstacle) {
    //     return (
    //       this.position.x < obstacle.x + obstacle.width &&
    //       this.position.x + this.width > obstacle.x &&
    //       this.position.y < obstacle.y + obstacle.height &&
    //       this.position.y + this.height > obstacle.y
    //       // wall(obstacle)가 없는 영역에서는 무조건 하나의 조건은 false
    //       // 하지만 벽 혹은 물체의 영역을 침범하면 모두 참이 되어 true
    //     );
    //   }
}



