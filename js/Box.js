export default class Box {
    constructor(width=32, height=32) {
        this.width = width;
        this.height = height;

        this.position = {
            x: 96,
            y: 96,
        };

        this.img = new Image();
        this.img.src = "../images/box.png";
    }

    draw(ctx) {
        ctx.drawImage(
            this.img, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
         );
    }
}