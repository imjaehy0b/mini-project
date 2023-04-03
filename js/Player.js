
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
        const mapArray = map.map2d;
        const value = mapArray[this.y][this.x];
        
        switch(value) {
            case 1:
                if (this.direction.up) {
                    this.y += 1;
                } else if (this.direction.down) {
                    this.y -= 1;
                } else if (this.direction.left) {
                    this.x += 1;
                } else if (this.direction.right) {
                    this.x -= 1;
                }
                break;

            case 2:
                if (this.direction.up) { 
                    if (mapArray[this.y-1][this.x] == 1 || mapArray[this.y-1][this.x] == 2) {
                        this.y += 1;
                        break;
                    } 
                    mapArray[this.y][this.x] = 0;
                    mapArray[this.y-1][this.x] = 2;
                } else if (this.direction.down) {
                    if (mapArray[this.y+1][this.x] == 1 || mapArray[this.y+1][this.x] == 2) {
                        this.y -= 1;
                        break;
                    }
                    mapArray[this.y][this.x] = 0;
                    mapArray[this.y+1][this.x] = 2;
                } else if (this.direction.left) {
                    if (mapArray[this.y][this.x-1] == 1 || mapArray[this.y][this.x-1] == 2) {
                        this.x += 1;
                        break;
                    }
                    mapArray[this.y][this.x] = 0;
                    mapArray[this.y][this.x-1] = 2;
                } else if (this.direction.right) {
                    if (mapArray[this.y][this.x+1] == 1 || mapArray[this.y][this.x+1] == 2) {
                        this.x -= 1;
                        break;
                    }
                    mapArray[this.y][this.x] = 0;
                    mapArray[this.y][this.x+1] = 2;
                }
                break;
        }
        // if(mapArray[this.x][this.y] == 1) {
        //     if (this.direction.up) {
        //         this.y += 1;
        //     } else if (this.direction.down) {
        //         this.y -= 1;
        //     } else if (this.direction.left) {
        //         this.x += 1;
        //     } else if (this.direction.right) {
        //         this.x -= 1;
        //     }
        // }

        // if(mapArray[this.x][this.y] == 2) {
        //     if (this.direction.up) {
        //         mapArray[this.y][this.x] = 0;
        //         mapArray[this.y-1][this.x] = 2;
        //     } else if (this.direction.down) {
        //         this.y -= 1;
        //     } else if (this.direction.left) {
        //         this.x += 1;
        //     } else if (this.direction.right) {
        //         this.x -= 1;
        //     }
        // }
    }
    
}



