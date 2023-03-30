import { map2d, walls } from "../data/Wall.js";

export default class {
    constructor(width = 30, height = 48) {
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = "../images/player.png";

        this.position = {
            x: 40,
            y: 40,
        };
                            
        this.index = {
            x: Math.floor(this.position.x / 32),
            y: Math.floor(this.position.y / 32),
        };

        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false, 
        };

       
    }

    draw(ctx) { 
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        if (this.direction.up) {
            this.position.y -= 5;
        } else if (this.direction.down) {
            this.position.y += 5;
        } else if (this.direction.left) {
            this.position.x -= 5;
        } else if (this.direction.right) {
            this.position.x += 5;
        }
    }
    
    // update() {      
    //     if (this.direction.up) {
    //         this.position.y -= 1;
    //         this.index.y = Math.floor(this.position.y / 32);
    //     } else if (this.direction.down) {
    //         this.position.y += 1;
    //         this.index.y = Math.floor(this.position.y / 32);
    //     } else if (this.direction.left) {
    //         this.position.x -= 1;
    //         this.index.x = Math.floor(this.position.x / 32)
    //     } else if (this.direction.right) {
    //         this.position.x += 1;
    //         this.index.x = Math.floor(this.position.x / 32)
    //     }
    // }

    checkCollisions() {
        for (const wall of walls) {
            if (this.collidesWith(wall)) {
                if (this.direction.up) this.position.y = wall.y + wall.height;
                else if (this.direction.down) this.position.y = wall.y - this.height;
                else if (this.direction.left) this.position.x = wall.x + wall.width;
                else if (this.direction.right) this.position.x = wall.x - this.width;
            }
        }
    }

    // checkCollisions() {
    //     console.log(this.index.x, this.index.y);
    //     if(map2d[this.index.x][this.index.y] == 1) {
    //         if (this.direction.up) {
    //             console.log(this.position.y);
    //             this.position.y = (this.index.y+1) * 32;
    //             console.log(this.position.y);
    //             this.index.y = Math.floor(this.position.y / 32);
    //         } else if (this.direction.down) {
    //             console.log(this.position.y);
    //             this.position.y = (this.index.y-2) * 32;
    //             console.log(this.position.y);
    //             this.index.y = Math.floor(this.position.y / 32);
    //         }
    //         if (this.direction.up) this.position.y = wall.y + wall.height;
    //         else if (this.direction.down) this.position.y = wall.y - this.height;
    //         else if (this.direction.left) this.position.x = wall.x + wall.width;
    //         else if (this.direction.right) this.position.x = wall.x - this.width;
    //     }
    // }

    collidesWith(obstacle) {
        return (
          this.position.x < obstacle.x + obstacle.width &&
          this.position.x + this.width > obstacle.x &&
          this.position.y < obstacle.y + obstacle.height &&
          this.position.y + this.height > obstacle.y
          // wall(obstacle)가 없는 영역에서는 무조건 하나의 조건은 false
          // 하지만 벽 혹은 물체의 영역을 침범하면 모두 참이 되어 true
        );
      }
}



