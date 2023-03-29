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
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.position.x, this.position.y, 50, 50);
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);

        // this.img.onload = () => {
        //     ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
        // } 
    }
    
    update(direction) {      
        if (direction.up)
            this.position.y -= 5;
        else if (direction.down)
            this.position.y += 5;
        else if (direction.left)
            this.position.x -= 5;
        else if(direction.right)
            this.position.x += 5;
    }
}

export default Player;