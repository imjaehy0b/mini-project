/** @type {HTMLCanvasElement} */

import Background from "./Background.js";
import Player from "./Player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); 

canvas.width = 1024;
canvas.height = 768;
const playerWidth = 50;
const playerHeight = 80;

const background = new Background(canvas.width, canvas.height);
const player = new Player(playerWidth, playerHeight);

function animate() {
    window.requestAnimationFrame(animate);
    
    background.draw(ctx);
    player.draw(ctx);
    player.update();
}

animate();

window.addEventListener("keydown", (event) => {
    console.log(event);
    switch (event.key) {
        case "w": 
            break;

        case "a":
            break;

        case "s":
            break;
            
        case "d":
            break;
    }
})