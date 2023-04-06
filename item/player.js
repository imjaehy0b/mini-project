export default 
class Player {
    #img
    #width
    #height
    #position
    #velocity
    #direction 
    
    constructor() {
        this.#img = document.getElementById("player");
        
        this.#width = 64;
        this.#height = 64;
        
        this.#position = {
            x: 3,
            y: 2,
        };
        
        this.#velocity = {
            x: 1,
            y: 1,
        };
        
        this.#direction = {
            up: false,
            down: false,
            left: false,
            right: false, 
        };
    }

    move(direction) {
        switch (direction) {
            case "up":
                this.setDirection("up");
                // this.setVelocityY();
                break;
            case "down":
                this.setDirection("down");
                // this.setVelocityY();
                break;
            case "left":
                this.setDirection("left");
                // this.setVelocityX();
                break;
            case "right":
                this.setDirection("right");
                // this.setVelocityX();
                break;
        }
    }

    update() {
        if (this.#direction.up) {
            this.#position.y -= this.#velocity.y;
            this.resetVelocityY();
        } else if (this.#direction.down) {
            this.#position.y += this.#velocity.y;
            this.resetVelocityY();
        } else if (this.#direction.left) {
            this.#position.x -= this.#velocity.x;
            this.resetVelocityX();
        } else if (this.#direction.right) {
            this.#position.x += this.#velocity.x;
            this.resetVelocityX();
        }
    }

    draw(ctx) { 
        ctx.drawImage(this.#img, this.#position.x*64, this.#position.y*64, this.#width, this.#height);
    }

    setVelocity() {
        this.#velocity.x = 1;
        this.#velocity.y = 1;
    }

    resetVelocityX() {
        this.#velocity.x = 0;
    }

    resetVelocityY() {
        this.#velocity.y = 0;
    }
    
    setDirection(direction) {
        switch (direction) {
            case "up":
                this.#direction.up = true;
                break;
            case "down":
                this.#direction.down = true;
                break;
            case "left":
                this.#direction.left = true;
                break;
            case "right":
                this.#direction.right = true;
                break;
        }
    }

    resetDirection() {
        this.#direction.up = false;
        this.#direction.down = false;
        this.#direction.left = false;
        this.#direction.right = false;
    }

    correctPosition() {
        if (this.#direction.up) this.#position.y += 1;
        else if (this.#direction.down) this.#position.y -= 1;
        else if (this.#direction.left) this.#position.x += 1;
        else if (this.#direction.right) this.#position.x -= 1;
    }

    get position() {
        return this.#position;
    }

    get direction() {
        return this.#direction;
    }
}