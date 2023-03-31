export default class Box {
    constructor(x, y) {
        this.width = 32;
        this.height = 32;
        this.x = x;
        this.y = y;
        
        this.img = new Image();
        this.img.src = "../images/box.png";
    }

    draw(ctx) {
        ctx.drawImage(
            this.img, 
            this.x, 
            this.y, 
            this.width, 
            this.height
         );
    }
}