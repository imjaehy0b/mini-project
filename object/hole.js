export default 
class Hole {
    #img
    #width
    #height
    #x
    #y
    #wordKey
    #wordValue
    constructor(x, y, {key, value}) {
        this.#img = document.getElementById("hole");
        this.#x = x;
        this.#y = y;
        this.#width = 64;
        this.#height = 64;
        this.#wordKey = key;
        this.#wordValue = value;
    }

    draw(ctx) {
        let img = this.#img;
        let x = this.#x;
        let y = this.#y;
        let width = this.#width;
        let height = this.#height;
        ctx.drawImage(img, x*width, y*height, width, height);
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
}