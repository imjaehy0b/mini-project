/** @type {HTMLCanvasElement} */

import Background from "./Background.js";
import Player from "./Player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); 

canvas.width = 1024;
canvas.height = 768;

ctx.fillStyle = "white";
ctx.fillRect(0, 0,  canvas.width, canvas.height);

const background = new Background(0, 0);
background.draw(ctx);

const player = new Player(500, 300);
player.draw(ctx);
