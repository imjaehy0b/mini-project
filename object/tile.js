export default
    class Tile {
    #img
    #x
    #y
    #width
    #height
    constructor(x, y, stageIndex) {
        // this.#img = document.getElementById("tile");
        this.#x = x;
        this.#y = y;
        this.#width = 64;
        this.#height = 64;
        this.#img = null;
        if (stageIndex == 2) 
            this.#img = document.getElementById("tile3");
        else
            this.#img = document.getElementById("tile12");
    }

    draw(ctx) {
        let img = this.#img;
        let x = this.#x;
        let y = this.#y;
        let width = this.#width;
        let height = this.#height;
        ctx.drawImage(img, x * width, y * height, width, height);
    }
}