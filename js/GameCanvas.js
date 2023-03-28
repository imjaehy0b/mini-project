/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); 

canvas.width = 1024;
canvas.height = 768;

ctx.fillStyle = "white";
ctx.fillRect(40, 40,  canvas.width, canvas.height);