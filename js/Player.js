class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = "../images/player.png";
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx) {
        this.img.onload = () => {
            ctx.drawImage(this.img, this.x, this.y, 50, 80);
        }
    }
}

export default Player;