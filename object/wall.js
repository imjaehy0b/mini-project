export default
    class Wall {
    #img
    #x
    #y
    #width
    #height
    constructor(x, y, wallKind) {
        // this.#img = document.getElementById("wall");
        this.#x = x;
        this.#y = y;
        this.#width = 64;
        this.#height = 64;
        this.#img = null;

        switch(wallKind) {
            case 10 :
                this.#img = document.getElementById("wallFront");
                break;

            case 11:
                this.#img = document.getElementById("wallLeft");
                break;
                
            case 12:
                this.#img = document.getElementById("wallRight");
                break;
                
            case 13:
                this.#img = document.getElementById("wallEdgeLeft");
                break;
                
            case 14:
                this.#img = document.getElementById("wallEdgeRight");
                break;
                
            case 15:
                this.#img = document.getElementById("wallUpper");
                break;
        }
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