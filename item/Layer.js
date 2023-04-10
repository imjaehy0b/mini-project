import BackGround from './background.js';

export default class Layer {
  #width;
  #height;
  #theTreeBehind1;
  #theTreeBehind2;
  #hugeTree;
  #grass;
  #ground;
  
  constructor() {
    this.#width = 1024;
    this.#height = 640

    const ground = document.getElementById('ground');
    const grass = document.getElementById('grass');
    const hugeTree = document.getElementById('hugetree');
    const theTreeBehind1 = document.getElementById('thetreebehind1');
    const theTreeBehind2 = document.getElementById('thetreebehind2');

    this.#ground = new BackGround(ground, 2.5, 160);
    this.#grass = new BackGround(grass, 2, 160);
    this.#hugeTree = new BackGround(hugeTree, 1.5, 0);
    this.#theTreeBehind1 = new BackGround(theTreeBehind1, 1, 20);
    this.#theTreeBehind2 = new BackGround(theTreeBehind2, 0.5, 0);

    this.object = [
      this.#theTreeBehind1,
      this.#theTreeBehind2,
      this.#hugeTree,
      this.#grass,
      this.#ground,
    ];
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.#width, this.#height);

    this.object.forEach((obj) => {
      obj.update();
      obj.draw(ctx);
    });
  }
}
