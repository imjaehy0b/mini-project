export default 
class Hole {
    #width
    #height
    #position
    #img
    #wordKey
    #wordValue
    constructor(x, y, {key, value}) {
        this.#img = document.getElementById("hole");
        
        this.#width = 64;
        this.#height = 64;

        this.#position = {
            x: x,
            y: y,
        }
        
        this.#wordKey = key;
        this.#wordValue = value;
    }

    draw(ctx) {
        let x = this.#position.x;
        let y = this.#position.y;
        let width = this.#width;
        let height = this.#height;
        ctx.drawImage(this.#img, x, y, width, height);
    }

    get positionX() {
        return this.#position.x;
    }

    get positionY() {
        return this.#position.y;
    }
}