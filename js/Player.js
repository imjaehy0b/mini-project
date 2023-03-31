import { walls } from "../data/Wall.js";

export default class {
    constructor(width = 32, height = 32) {
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = "../images/player.png";

        this.position = {
            x: 50,
            y: 180,
        };
                            
        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false, 
        };

        this.isGrab = false;
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
    
    checkCollisionsWithBoxes(boxes) {
        for (const box of boxes) {
            if (this.collidesWith(box)) {
                if (this.direction.up) {
                    box.y -= 5;
                } else if (this.direction.down) {
                    box.y += 5;
                } else if (this.direction.left) {
                    box.x -= 5;
                } else if (this.direction.right) {
                    box.x += 5;
                }
            }
        }
    }

    checkCollisionsWithWalls() {
        for (const wall of walls) {
            if (this.collidesWith(wall)) {
                if (this.direction.up) this.position.y = wall.y + wall.height;
                else if (this.direction.down) this.position.y = wall.y - this.height;
                else if (this.direction.left) this.position.x = wall.x + wall.width;
                else if (this.direction.right) this.position.x = wall.x - this.width;
            }
        }
    }

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



