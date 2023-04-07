export default 
class Player {
    #img
    #x
    #y
    #width
    #height
    #step
    #direction 
    constructor() {
        this.#img = document.getElementById("player");
        this.#x = 3;
        this.#y = 2;
        this.#width = 64;
        this.#height = 64;
        this.#step = 1;
        
        this.#direction = {
            up: false,
            down: false,
            left: false,
            right: false, 
        };
    }

    // player가 움직일 direction을 설정 
    move(direction) {
        switch (direction) {
            case "up":
                this.setDirection("up");
                break;
            case "down":
                this.setDirection("down");
                break;
            case "left":
                this.setDirection("left");
                break;
            case "right":
                this.setDirection("right");
                break;
        }
    }

    // player의 direction으로 한 칸 움직인 뒤 vx와 vy를 0으로 만들어 더이상 움직이지 않게 만듬 
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
    }

    draw(ctx) { 
        let img = this.#img;
        let x = this.#x;
        let y = this.#y;
        let width = this.#width;
        let height = this.#height;
        ctx.drawImage(img, x*width, y*height, width, height);    
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