export default class ReversBackGround {
    #x;
    #y
    #img
    #img2
    #img3
    #width
    #height
    constructor(x=0,y=0) {
      this.#x = x
      this.#y = y
      this.#width = 1024
      this.#height = 640
      this.#img = document.getElementById('startReverse')
  
    }
  

    draw(ctx) {
      let img = this.#img
      let x = this.#x
      let y = this.#y
      let w = this.#width
      let h = this.#height
      ctx.drawImage(img,x,y,w,h)
  
    }
  }
  