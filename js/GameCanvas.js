/** @type {HTMLCanvasElement} */

import Background from "./Background.js";
import Player from "./Player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 768;
const playerWidth = 50;
const playerHeight = 80;

let direction = {
    up: false,
    down: false,
    left: false,
    right: false,
}

const background = new Background(canvas.width, canvas.height);
const player = new Player(playerWidth, playerHeight);

function animate() {
    window.requestAnimationFrame(animate);
    background.draw(ctx);
    player.draw(ctx);
    player.update(direction);
}

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
