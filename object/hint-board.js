export default
    class HintBoard {
    #img
    #x
    #y
    #width
    #height
    constructor(x = 512, y = 0) {
        this.#img = document.getElementById("hintWall");
        this.#x = x;
        this.#y = y;
        this.#width = 256;
        this.#height = 512;
    }

    draw(ctx) {
        let img = this.#img;
        let x = this.#x;
        let y = this.#y;
        let width = this.#width;
        let height = this.#height;
        ctx.drawImage(img, x, y, width, height);
    }
}