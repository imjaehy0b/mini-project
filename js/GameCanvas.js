/** @type {HTMLCanvasElement} */

import Background from "./Background.js";
import CollisionBlock, {collisionBlocks} from "./collision.js";
import Player from "./Player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 256;
canvas.height = 256;
const playerWidth = 30;
const playerHeight = 48;

let direction = {
    up: false,
    down: false,
    left: false,
    right: false,
}

const background = new Background(canvas.width, canvas.height);
const player = new Player(playerWidth, playerHeight);

const walls = [
    { x: 0, y: 0, width: 256, height: 32 },
    { x: 0, y: 32, width: 32, height: 224 },
    { x: 224, y: 32, width: 32, height: 224 },
    { x: 32, y: 224, width: 192, height: 32 },
    // add more walls here
  ];

function animate() {
    window.requestAnimationFrame(animate);
    background.draw(ctx);

    // collisionBlocks.forEach((CollisionBlock) => {
    //     CollisionBlock.draw(ctx);
    // })
    player.update(direction);

    for (const wall of walls) {
        if (player.collidesWith(wall)) {
          if (direction.up) player.position.y = wall.y + wall.height;
          else if (direction.down) player.position.y = wall.y - player.height;
          else if (direction.left) player.position.x = wall.x + wall.width;
          else if (direction.right) player.position.x = wall.x - player.width;
        }
      }

    player.draw(ctx);
}

window.addEventListener("mousedown", (event) => {
    console.log(event);
})

window.addEventListener("keydown", (event) => {
   
    console.log(event);
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

window.addEventListener("keyup", (event) => {

    console.log(event);
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

animate();
