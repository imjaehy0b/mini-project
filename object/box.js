export default 
class Box {
    #width
    #height
    #position
    #img
    #key
    #inHole
    constructor(x, y, key) {
        this.#img = document.getElementById("box");
        
        this.#width = 64;
        this.#height = 64;

        this.#inHole = false;
        this.#position = {
            x: x,
            y: y,
        }
        
        this.#key = key;
    }

    draw(ctx) {
        let x = this.#position.x;
        let y = this.#position.y;
        let width = this.#width;
        let height = this.#height;
        ctx.drawImage(this.#img, x, y, width, height);
    }

    setPosition(x, y) {
        this.#position.x = x;
        this.#position.y = y;
    }

    get inHole() {
        return this.#inHole;
    }

    set inHole(bool) {
        this.#inHole = bool;
    }  

    
}