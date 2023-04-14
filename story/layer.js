import Story from './story.js';

export default class Layer {
    #x
    #y
    #width;
    #height;
		#img1
		#img2
		#img3
		#img4
		#img5
		#object
		#delay
    #i 
    #bol
    constructor() {
			this.#x = 0
			this.#y = 0
      this.#width = 1024;
      this.#height = 640
      this.#bol = true;
      this.#i = 0;
  
		
      const img1 = document.getElementById('1');
      const img2 = document.getElementById('2');
      const img3 = document.getElementById('3');
      const img4 = document.getElementById('4');
      const img5 = document.getElementById('5');
  
      this.#img1 = new Story(img1,this.#x,this.#y)
      this.#img2 = new Story(img2,this.#x,this.#y)
      this.#img3 = new Story(img3,this.#x,this.#y)
      this.#img4 = new Story(img4,this.#x,this.#y)
      this.#img5 = new Story(img5,this.#x,this.#y)
  
			this.#delay = 200
			
      this.#object = [
        this.#img1,
        this.#img2,
        this.#img3,
        this.#img4,
        this.#img5,
      ];
    }
  
		update(){
			this.#delay--
			if (this.#delay==0&&this.#i!=5) {
				this.#i += 1
				this.#delay=200
			}
			if (this.i==5) {
				this.#bol=false
			}
		}
		
    draw(ctx) {
			// ctx.clearRect(0, 0, this.#width, this.#height);
			this.#object[this.#i].draw(ctx);
			
			
			
      // this.object.forEach((obj) => {
				
      // });
    }

		get bol(){
			return this.#bol
		}
  }