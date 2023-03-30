const background1 = [2538, 2538, 2538, 2538, 2538, 2538, 2538, 2538,
    2538, 0, 0, 0, 0, 0, 0, 2538,
    2538, 0, 0, 0, 0, 0, 0, 2538,
    2538, 0, 0, 2538, 2538, 0, 0, 2538,
    2538, 0, 0, 2538, 2538, 0, 0, 2538,
    2538, 0, 0, 0, 0, 0, 0, 2538,
    2538, 0, 0, 0, 0, 0, 0, 2538,
    2538, 2538, 2538, 2538, 2538, 2538, 2538, 2538];

  Array.prototype.parse2d = function() {
    const rows = []
    for (let i = 0; i < this.length; i+=8) {
        rows.push(this.slice(i, i+8))
    }

    return rows;
  }
export default class CollisionBlock {
    constructor({position}) {
        this.position = position;
        this.width = 32;
        this.height = 32;
    }

    draw(ctx) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

export const collisionBlocks = [];
const parsedCollisions = background1.parse2d();

parsedCollisions.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 2538) {
            collisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 32,
                    y: y * 32,
                }
            }))
        }
    })
})
