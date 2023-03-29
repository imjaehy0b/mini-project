class Background {
    constructor(width, height) {
        this.position = {
            x: 0,
            y: 0,
        }
        
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = "../images/temp map2.png";
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx) {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);        
    }
}

export default Background;