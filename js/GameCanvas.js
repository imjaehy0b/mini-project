/** @type {HTMLCanvasElement} */

import Background from "./Background.js";
import Player from "./Player.js";
import Box from "./Box.js";

class GameCanvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.canvas.setAttribute("tabindex", "0");
        this.canvas.focus();

        /*
        this.canvas.addEventListener 오류 고치는 방법 
        This is because canvas elements do not have focus by default, so they don't receive keyboard events.
        To fix this, you can add the tabindex attribute to the canvas element to give it focus, and then call the focus() method on it to make it active:
        */

        this.ctx = this.canvas.getContext("2d");
        this.WIDTH = 256;
        this.HEIGHT = 256;
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;

        this.background = new Background(this.WIDTH, this.HEIGHT);
        this.player = new Player();

        let positions = [
            {x: 40, y: 40},
            {x: 100, y: 100},
            {x: 150, y: 150}
        ];
        
        this.boxes = [];
        positions.forEach((position) => {
            this.boxes.push(new Box({position}));
        })
     
        this.canvas.addEventListener("keydown", (event) => {
            console.log(event);

            let { direction }= this.player;
            switch (event.key) {
                case "w":
                    direction.up = true;
                    break;
        
                case "s":
                    direction.down = true;
                    break;
        
                case "a":
                    direction.left = true;
                    break;
        
                case "d":
                    direction.right = true;
                    break;
            }
        });
        
        this.canvas.addEventListener("keyup", (event) => {
            console.log(event);

            let { direction }= this.player;
            switch (event.key) {
                case "w":
                    direction.up = false;
                    break;
        
                case "s":
                    direction.down = false;
                    break;
        
                case "a":
                    direction.left = false;
                    break;
        
                case "d":
                    direction.right = false;
                    break;
            }
        });
    }

    run() {
        // window.requestAnimationFrame(run);
        requestAnimationFrame(this.run.bind(this));
        
        /*
        In the run() method of the GameCanvas class, window.requestAnimationFrame(run) should be changed to window.requestAnimationFrame(this.run.bind(this)). 
        This is because run is not defined in the current scope, but this.run refers to the run method of the current object (i.e., the GameCanvas instance).
        */

        this.player.update();   
        this.player.checkCollisions();
        this.background.draw(this.ctx);
        for(var box of this.boxes) {
            box.draw(this.ctx);
        }
        // this.box.draw(this.ctx);
        this.player.draw(this.ctx);
    }

    
}

const gameCanvas = new GameCanvas();
gameCanvas.run();

// const gameCanvas = new GameCanvas();
// gameCanvas.ctx.fillStyle = "white";
// gameCanvas.ctx.fillRect(0, 0, 20, 20);

// player.js로 이동 
// const playerWidth = 30;
// const playerHeight = 48;

// player.js로 이동 
// let direction = {
//     up: false,
//     down: false,
//     left: false,
//     right: false, 
// };

/*
const background = new Background(WIDTH, HEIGHT);
const player = new Player();

function animate() {
    window.requestAnimationFrame(animate);
    background.draw(ctx);

    collisionBlocks.forEach((CollisionBlock) => {
        CollisionBlock.draw(ctx);
    })

    player.update();

    // // player.js로 이동 후 함수화 
    for (const wall of walls) {
        if (player.collidesWith(wall)) {
          if (player.direction.up) player.position.y = wall.y + wall.height;
          else if (player.direction.down) player.position.y = wall.y - player.height;
          else if (player.direction.left) player.position.x = wall.x + wall.width;
          else if (player.direction.right) player.position.x = wall.x - player.width;
        }
      }

    player.draw(ctx);
}

// window.addEventListener("mousedown", (event) => {
//     console.log(event);
// })

animate();
*/