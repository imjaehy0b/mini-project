export default class SelectBackground {
    #x
    #y
    #img;
    #width;
    #height;
    constructor() {
      this.#x = 0
      this.#y = 0
      this.#width = 1024;
      this.#height = 640;
  
      this.#img = document.getElementById("selectBackground");
    }
  
    draw(ctx) {
      ctx.drawImage(this.#img, this.#x, this.#y, this.#width, this.#height);
    }
  }
  