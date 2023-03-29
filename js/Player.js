class Player {
    constructor(width, height) {
        this.position = {
            x: 115,
            y: 105,
        }
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = "../images/player.png";
        
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx) { 
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }
    
    update(direction) {      
        if (direction.up)
            this.position.y -= 3;
        else if (direction.down)
            this.position.y += 3;
        else if (direction.left)
            this.position.x -= 3;
        else if (direction.right)
            this.position.x += 3;
            
        // if (direction.up)
        //     if (this.position.y + this.height > 170) {
        //         if(this.position.y + this.height > 355 && this.position.x + this.width/2 > 585 && this.position.x + this.width/2 < 685 ) {
                    
        //         } else {
        //             this.position.y -= 5;
        //         }
        //     } else {
        //         this.position.y += 5;

        //     }
        // else if (direction.down)
        //     if(this.position.y + this.height < 610)
        //         this.position.y += 5;
        //     else 
        //         this.position.y -= 5;
        // else if (direction.left)
        //     if(this.position.x + this.width/2 > 165)
        //         this.position.x -= 5;
        //     else 
        //         this.position.x += 5;
        // else if(direction.right)
        //     if(this.position.x + this.width/2 < 855)
        //         this.position.x += 5;
        //     else 
        //         this.position.x -= 5;
    }

    collidesWith(rectangle) {
        return (
          this.position.x < rectangle.x + rectangle.width &&
          this.position.x + this.width > rectangle.x &&
          this.position.y < rectangle.y + rectangle.height &&
          this.position.y + this.height > rectangle.y
        );
      }
}

export default Player;