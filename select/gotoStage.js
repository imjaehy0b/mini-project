export default class GotoStage{
    #x
    #y
    #width
    #height
    #img
    constructor(){
        this.#x =0
        this.#y = 0
        this.#width = 64
        this.#height = 64
        this.#img = document.getElementById('idle')

    }

    draw(ctx){
        let x = this.#x
        let y = this.#y
        let w = this.#width
        let h = this.#height
        let img = this.#img

        ctx.drawImage(img,x,y,w,h)
    }
}