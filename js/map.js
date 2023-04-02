import Tile from "./tile.js";
import Wall from "./wall.js"; 
import Box from "./Box.js";

export default class Map {
    constructor() {
        this.map = [
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 2, 0, 0, 2, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 1, 1
        ];

        this.map2d = [];

        for (let i = 0; i < this.map.length; i+=8) {
            this.map2d.push(this.map.slice(i, i+8));
        }

        console.log(this.map2d);

        this.mapBlocks = [];
        this.map2d.forEach((row, y) => {
            row.forEach((column, x) => {
                
                switch (column) {
                    case 0:
                        this.mapBlocks.push(new Tile(x*64, y*64));
                        break;
                        
                    case 1:
                        this.mapBlocks.push(new Wall(x*64, y*64));
                        break;

                    case 2:
                        this.mapBlocks.push(new Box(x*64, y*64));
                        break; 
                }            
            })
        })
    }

    draw(ctx) {
        this.mapBlocks = [];
        this.map2d.forEach((row, y) => {
            row.forEach((column, x) => {
                switch (column) {
                    case 0:
                        this.mapBlocks.push(new Tile(x*64, y*64));
                        break;
                        
                    case 1:
                        this.mapBlocks.push(new Wall(x*64, y*64));
                        break;

                    case 2:
                        this.mapBlocks.push(new Box(x*64, y*64));
                        break; 
                }            
            })
        })

        for (const block of this.mapBlocks) {
            block.draw(ctx);
        }

    }
}