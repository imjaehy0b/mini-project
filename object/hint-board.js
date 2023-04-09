export default
    class HintBoard {
    #img
    #x
    #y
    #width
    #height
    // x = 512, y = 0
    constructor() {
        this.#img = document.getElementById("hintWall");
        this.#x = 512;
        this.#y = 0;
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