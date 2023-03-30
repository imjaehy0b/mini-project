export default class Box {
    constructor({ position }) {
        this.width = 32;
        this.height = 32;

        this.position = {
            x: position.x,
            y: position.y,
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