export default 
class HintBoard {
    #img
    #position
    #width
    #height
    constructor(x=512, y=0) {
        this.#img = document.getElementById("hintWall");
        this.#position = {
            x: x,
            y: y,
        }
        this.#width = 256;
        this.#height = 512;
    }

    draw(ctx) {
        let x = this.#position.x;
        let y = this.#position.y;
        let width = this.#width;
        let height = this.#height;
        ctx.drawImage(this.#img, x, y, width, height);
    }
}