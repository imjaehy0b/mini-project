class Background {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = "../images/map.png";
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx) {
        this.img.onload = () => {
            ctx.drawImage(this.img, this.x, this.y, 1024, 768);        
        }
    }
}

export default Background;