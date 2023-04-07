export default 
class Box {
    #img
    #x
    #y
    #width
    #height
    #inHole
    #key
    constructor(x, y, key) {
        this.#img = document.getElementById("box");  
        this.#x = x;
        this.#y = y;
        this.#width = 64;
        this.#height = 64;
        this.#inHole = false;  
        this.#key = key;
    }

    draw(ctx) {
        let img = this.#img;
        let x = this.#x;
        let y = this.#y;
        let width = this.#width;
        let height = this.#height;
        ctx.drawImage(img, x*width, y*height, width, height);
    }

    setPosition(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get inHole() {
        return this.#inHole;
    }

    set inHole(bool) {
        this.#inHole = bool;
    }  

    
}