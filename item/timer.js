export default class Timer {
  #time
  constructor() {
    this.#time = 36000;
  }

  decreaseTime() {
    this.#time--;
  }

  checkTime() {
    if (this.#time == 0) {
      return true;
    }
  }
  
  draw(ctx) {
    let time = Math.floor(this.#time/60);
    ctx.beginPath();
    ctx.arc(32, 32, 25, 0, Math.PI*2);
    ctx.stroke();
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.fillText(time, 32, 40);
  }
}
