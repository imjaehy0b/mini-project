class Player {
    constructor(width, height) {
        this.position = {
            x: 500,
            y: 300,
        }
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = "../images/player.png";
        
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx) {
        this.img.onload = () => {
            ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
        }
    }

    update() {
        this.position.x += 10;
    }
}

export default Player;