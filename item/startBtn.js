export default class StartBtn {
  constructor() {
    this.x = 280;
    this.y = 250;
    this.width = 250;
    this.height = 100;

    this.img = document.getElementById('startBtn');
  }

  buttonClick(e) {
    console.log(e.offsetX);
    if (
      e.offsetX >= this.x &&
      e.offsetX <= this.x + this.width &&
      e.offsetY >= this.y &&
      e.offsetY <= this.y + this.height
    ) {
      window.location.href = '/game/app.html';
    }
  }

  draw(ctx) {
    let x = this.x;
    let y = this.y;
    let width = this.width;
    let height = this.height;
    ctx.drawImage(this.img, x, y, width, height);
  }
}
