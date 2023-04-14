export default class Ending {
    #x
    #y

    #width
    #height
    #delay
  
    #img
    // #edImg1
    #edImg2
    #edImg3
    #edImg4
    #edImg5
    #edImg6
    #edImg7
    #edImg8
    #edImg9
    #edImg10
    #edImg11
    #edImg12
    #edImg13
    #edImg14
    #edImg15
  
    constructor(x=0,y=0) {
      this.#x = x
      this.#y = y
      this.#width = 1024
      this.#height = 640
      this.#delay = 3000
  
    //   this.#img = document.getElementById('ending00')
      this.#img = document.getElementById('ending01')
      this.#edImg2 = document.getElementById('ending02')
      this.#edImg3 = document.getElementById('ending03')
      this.#edImg4 = document.getElementById('ending04')
      this.#edImg5 = document.getElementById('ending05')
      this.#edImg6 = document.getElementById('ending06')
      this.#edImg7 = document.getElementById('ending07')
      this.#edImg8 = document.getElementById('ending08')
      this.#edImg9 = document.getElementById('ending09')
      this.#edImg10 = document.getElementById('ending10')
      this.#edImg11 = document.getElementById('ending11')
      this.#edImg12 = document.getElementById('ending12')
      this.#edImg13 = document.getElementById('ending13')
      this.#edImg14 = document.getElementById('ending14')
      this.#edImg15 = document.getElementById('ending15')
    }
  
    update(){
      this.#delay--;
      console.log(this.#delay);
    //   console.log(this.#delay);
      if (this.#delay==2800) {
          this.#img = this.#edImg2
        }
     else if (this.#delay==2500) {
        this.#img  = this.#edImg3
      }
      else if(this.#delay==2200){
        this.#img  = this.#edImg4
      }
      else if(this.#delay==2130){
        this.#img  = this.#edImg5
      }
      else if(this.#delay==2060){
        this.#img  = this.#edImg6
      }
      else if(this.#delay==1990){
        this.#img  = this.#edImg7
      }
      else if(this.#delay==1920){
        this.#img  = this.#edImg8
      }
      else if(this.#delay==1850){
        this.#img  = this.#edImg9
      }
      else if(this.#delay==1780){
        this.#img  = this.#edImg10
      }
      else if(this.#delay==1710){
        this.#img  = this.#edImg11
      }
      else if(this.#delay==1640){
        this.#img  = this.#edImg12
      }
      else if(this.#delay==1570){
        this.#img  = this.#edImg13
      }
      else if(this.#delay==1500){
        this.#img  = this.#edImg14
      }
      else if(this.#delay==1350){
        this.#img  = this.#edImg15
      }
      // console.log(this.#img);
    }


  /**@param {canvasRenderingContext2D':}ctx */
    draw(ctx) {
      let img = this.#img
      let x = this.#x
      let y = this.#y
      let w = this.#width
      let h = this.#height
      ctx.drawImage(img,x,y,w,h)
      // console.log("drawEndgng…")
      
    }
  }