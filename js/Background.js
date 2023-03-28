class Background {
    constructor(width, height) {
        this.position = {
            x: 0,
            y: 0,
        }
        
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = "../images/map.png";
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx) {
        this.img.onload = () => {
            ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);        
        }
    }
}

export default Background;