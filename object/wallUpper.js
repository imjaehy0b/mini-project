export default 
class WallUpper {
    #img
    #x
    #y
    #width
    #height
    constructor(x, y) {
        this.#img = document.getElementById("wallUpper");
        this.#x = x;
        this.#y = y;
        this.#width = 64;
        this.#height = 64;
    }

    draw(ctx) {
        let img = this.#img;
        let x = this.#x;
        let y = this.#y;
        let width = this.#width;
        let height = this.#height;
        ctx.drawImage(img, x*width, y*height, width, height);
    }
}