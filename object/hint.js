import {hintArr} from "../data.js";
export default
    class Hint {
    #x
    #y
    #textArr
    #textStyle
    #lineHeight
    // x = 540, y = 150
    constructor(stageIndex) {
        this.#x = 800;
        this.#y = 150;
        this.#textArr = hintArr[stageIndex];
        this.#textStyle = 'bold 20px Arial, sans-serif';
        this.#lineHeight = 35;
    }

    draw(ctx) {
        let x = this.#x;
        let y = this.#y;
        let textArr = this.#textArr;
        let textStyle = this.#textStyle;
        let lineHeight = this.#lineHeight;
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        for (let i in textArr) {
            ctx.font = textStyle;
            ctx.fillText(textArr[i], x, y + i * lineHeight);
        }
    }
}