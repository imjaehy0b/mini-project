export default class Tile {
    constructor(x, y) {
        this.width = 64;
        this.height = 64;
        this.x = x;
        this.y = y;
        
        this.img = new Image();
        this.img.src = "../images/tile_64.png";
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}