export default class BackGround {
  #x;
  #y
  #img
  #img1
  #img2
  #img3
  #width
  #height
  #delay
  constructor(x=0,y=0) {
    this.#x = x
    this.#y = y
    this.#width = 1024
    this.#height = 640
    this.#delay = 90
    this.#img = document.getElementById('start')
    this.#img1 = document.getElementById('start')
    this.#img2 = document.getElementById('startThunder')
    this.#img3 = document.getElementById('startReverse')

  }

  update(){
    this.#delay--
    if (this.#delay==80) {
      this.#img = this.#img2
    }else if (this.#delay==50) {
        this.#img = this.#img3
    }else if(this.#delay==10){
      this.#img = this.#img1
    }
    if (this.#delay==0) {
      this.#delay = 90
    }
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
