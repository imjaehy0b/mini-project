export default class BackGround {
  #x;
  #x2;
  #y;
  #speedModifier
  #image
  constructor(image, movSpeed, y_Position) {
    this.#speedModifier = movSpeed;
    this.#image = image;
    this.#x = 0;
    this.#x2 = 768;
    this.#y = y_Position;
  }

  update() {
    let speed = this.#speedModifier;
    if (this.#x < -768) {
      this.#x = 768 - speed + this.#x2;
    } else {
      this.#x -= speed;
    }

    if (this.#x2 < -768) {
      this.#x2 = 768 - speed + this.#x;
    } else {
      this.#x2 -= speed;
    }
  }
  draw(ctx) {
    ctx.drawImage(this.#image, this.#x, this.#y,768,512);
    ctx.drawImage(this.#image, this.#x2, this.#y,768,512);
  }
}
