export default 
class Wall {
    #width
    #height
    #position
    #img
    
    constructor(x, y) {
        this.#img = document.getElementById("wall");
        
        this.#width = 64;
        this.#height = 64;

        this.#position = {
            x: x,
            y: y,
        }
        
    }

    draw(ctx) {
        let x = this.#position.x;
        let y = this.#position.y;
        let width = this.#width;
        let height = this.#height;
        ctx.drawImage(this.#img, x, y, width, height);
    }
}