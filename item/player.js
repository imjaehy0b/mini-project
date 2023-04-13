import { playerPosition } from "../data.js";

export default
    class Player {
    #img
    #x
    #y
    #width
    #height
    #step
    #direction
    #walkIndex
    #walkDirection
    #walkDelay
   
    constructor(stageIndex) {
        this.#img = document.getElementById("player");
        this.#x = playerPosition[stageIndex][0];
        this.#y = playerPosition[stageIndex][1];
        this.#width = this.#img.width / 3;
        this.#height = this.#img.height / 4;
        this.#step = 1;

        this.#walkIndex = 1;
        this.#walkDirection = 0;
        this.#walkDelay = 10;

        this.#direction = {
            up: false,
            down: false,
            left: false,
            right: false,
        };
    }

    draw(ctx) {
        let img = this.#img;
        let x = this.#x;
        let y = this.#y;
        let w = this.#width;
        let h = this.#height;
        let sx = w*this.#walkIndex;
        let sy = h*this.#walkDirection;
        ctx.drawImage(
            img, sx, sy, w, h,
            x*64, y*64, 64, 64);
    }

    update() {
        if (this.#direction.up) {
            this.#y -= this.#step;
            this.#step = 0;
        } else if (this.#direction.down) {
            this.#y += this.#step;
            this.#step = 0;
        } else if (this.#direction.left) {
            this.#x -= this.#step;
            this.#step = 0;
        } else if (this.#direction.right) {
            this.#x += this.#step;
            this.#step = 0;
        }

        this.#walkDelay--;
        if(this.#walkDelay ==0) {
            this.#walkIndex = (this.#walkIndex ==0) ? 2 : 0;
            this.#walkDelay = 10;
        }

    }

    // player가 움직일 direction을 설정 
    move(direction) {
        switch (direction) {
            case "up":
                this.setDirection("up");
                this.#walkDirection = 2;
                break;
            case "down":
                this.setDirection("down");
                this.#walkDirection = 0;
                break;
            case "left":
                this.setDirection("left");
                this.#walkDirection = 1;
                break;
            case "right":
                this.setDirection("right");
                this.#walkDirection = 3;
                break;
        }
    }

    setStep() {
        this.#step = 1;
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

    resetPosition() {
        // player가 이동 중 map의 obstacle과 충돌했을 때 기존의 위치로 이동 
        if (this.#direction.up) this.#y += 1;
        else if (this.#direction.down) this.#y -= 1;
        else if (this.#direction.left) this.#x += 1;
        else if (this.#direction.right) this.#x -= 1;
    }

    warp(x, y) {
        if (this.#direction.up) {
            this.#x = x;
            this.#y = y-1;   
        } else if (this.#direction.down) {
            this.#x = x;
            this.#y = y+1;
        } else if (this.#direction.left) { 
            this.#x = x-1;
            this.#y = y;
        } else if (this.#direction.right) { 
            this.#x = x+1;
            this.#y = y;
        }
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get direction() {
        return this.#direction;
    }
}