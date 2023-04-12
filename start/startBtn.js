export default class StartBtn {
  #x
  #y
  #width
  #height
  #img
  #startImg
  #hoverImg
  constructor() {
    this.#x = 400;
    this.#y = 520;
    this.#width = 250;
    this.#height = 100;

    this.#img = document.getElementById('startBtn');
    this.#startImg = document.getElementById('startBtn');
    this.#hoverImg = document.getElementById('startBtnHover'); 
  }


  buttonHover(e) {
		if (
		  e.offsetX >= this.#x &&
		  e.offsetX <= this.#x + this.#width &&
		  e.offsetY >= this.#y &&
		  e.offsetY <= this.#y + this.#height
		) {
		  this.#img = this.#hoverImg;
		} else this.#img = this.#startImg
	  }


  draw(ctx) {
    let x = this.#x;
    let y = this.#y;
    let width = this.#width;
    let height = this.#height;
    ctx.drawImage(this.#img, x, y, width, height);
  }
}
