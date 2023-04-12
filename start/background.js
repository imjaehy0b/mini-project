import ReversBackGround from './reversBackground.js';
import Thunder from './thunder.js';


export default class BackGround {
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
    this.#img = document.getElementById('start')

    this.thunder = new Thunder()
    this.revers = new ReversBackGround()

  }

  update(ctx) {
      this.draw(ctx)
    // setInterval(() => {
    // }, 1000);

    // setInterval(() => {
    //   this.thunder.draw(ctx)      
    // }, 1000);

    // setInterval(() => {
    //   this.revers.draw(ctx)
    // }, 3000);

    // setInterval(() => {
    //   this.draw(ctx)
    // }, 3000);
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
