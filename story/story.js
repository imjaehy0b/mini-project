export default class Story {
    #img
    #x
    #y
    #width
    #height
    constructor(image,x,y) {
      this.#img = image;
      this.#x = x;
      this.#y = y;
      this.#width = 1024
      this.#height = 640
    }
  
    // update() {
      
    // }


    draw(ctx) {
      let img = this.#img
      let x = this.#x
      let y = this.#y
      let w = this.#width
      let h = this.#height
      ctx.drawImage(img,x,y,w,h);
    }
  }