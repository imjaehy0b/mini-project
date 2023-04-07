export default
class Hint {
    #x
    #y
    #textArr
    #textStyle
    #lineHeight
    constructor(x = 540, y = 150) {
        this.#x = x;
        this.#y = y;
        this.#textArr = ["거구장을 영어로 하면", "장우전이다", "윤원빈은 배가 고프다"];
        this.#textStyle = 'bold 20px Arial, sans-serif';
        this.#lineHeight = 35;
    }

    draw(ctx) {
        let x = this.#x;
        let y = this.#y;
        let textArr = this.#textArr;
        let textStyle = this.#textStyle;
        let lineHeight = this.#lineHeight;

        for (let i in textArr) {
            ctx.font = textStyle;
            ctx.fillText(textArr[i], x, y+i*lineHeight);
        }
    }
}