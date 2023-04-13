export default class LevelButton {
  #x;
  #x2;
  #x3;
  #y;
  #width;
  #height;

  #easyImg;
  #normalImg;
  #hardImg;

  #easyImg2;
  #normalImg2;
  #hardImg2;


  #easyHover;
  #normalHover;
  #hardHover;

  #easyStage
  #normalStage
  #hardStage

  #stageX
  #stageY
  #stageW 
  #stageH 
  constructor() {
    this.#easyStage = document.getElementById('easy');
    this.#normalStage = document.getElementById('normal');
    this.#hardStage = document.getElementById('hard');
    
    this.#easyImg = document.getElementById('easyButton');
    this.#easyImg2 = document.getElementById('easyButton');
    this.#easyHover = document.getElementById('easyHover');


    this.#normalImg = document.getElementById('normalButton');
    this.#normalImg2 = document.getElementById('normalButton');
    this.#normalHover = document.getElementById('normalHover');

    
    this.#hardImg = document.getElementById('hardButton');
    this.#hardImg2 = document.getElementById('hardButton');
    this.#hardHover = document.getElementById('hardHover');

    this.#width = 150;
    this.#height = 100;

    this.#x = 200;
    this.#x2 = 480;
    this.#x3 = 750;
    this.#y = 250;

    this.#stageX = 50
    this.#stageY = 50
    this.#stageW = 200
    this.#stageH = 150
  }

  buttonHover(e) {
    if (
      e.offsetX >= this.#x && e.offsetX <= this.#x + this.#width &&
      e.offsetY >= this.#y && e.offsetY <= this.#y + this.#height
    ) {
      this.#easyImg = this.#easyHover;
    } else this.#easyImg = this.#easyImg2;


    if (
      e.offsetX >= this.#x2 && e.offsetX <= this.#x2 + this.#width &&
      e.offsetY >= this.#y && e.offsetY <= this.#y + this.#height
    ) {
      this.#normalImg = this.#normalHover;
    } else this.#normalImg = this.#normalImg2;

    if (
      e.offsetX >= this.#x3 && e.offsetX <= this.#x3 + this.#width &&
      e.offsetY >= this.#y && e.offsetY <= this.#y + this.#height
    ) {
      this.#hardImg = this.#hardHover;
    } else this.#hardImg = this.#hardImg2;
  }

  draw(ctx) {
    ctx.drawImage(this.#easyStage, this.#x-this.#stageX, this.#stageY, this.#stageW, this.#stageH);
    ctx.drawImage(this.#normalStage, this.#x2-this.#stageX, this.#stageY, this.#stageW, this.#stageH);
    ctx.drawImage(this.#hardStage, this.#x3-this.#stageX, this.#stageY, this.#stageW, this.#stageH);

    ctx.drawImage(this.#easyImg, this.#x, this.#y, this.#width, this.#height);
    ctx.drawImage(this.#normalImg, this.#x2, this.#y, this.#width, this.#height);
    ctx.drawImage(this.#hardImg, this.#x3, this.#y, this.#width, this.#height);
  }
}