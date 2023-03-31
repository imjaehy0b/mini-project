/** @type {HTMLCanvasElement} */

import Background from "./Background.js";
import Player from "./Player.js";
import Box from "./Box.js";
import { boxProperties } from "/data/Wall.js";

export default class GameCanvas {
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
        
        this.boxes = [];
        boxProperties.forEach((boxProperty) => {
            this.boxes.push(new Box(boxProperty.x, boxProperty.y));
        })
     
        this.canvas.addEventListener("keydown", (event) => {
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

                case " ":
                    this.player.isGrab = true;
                    break;
            }
        });
        
        this.canvas.addEventListener("keyup", (event) => {
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

                case " ":
                    this.player.isGrab = false;
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
        this.player.checkCollisionsWithWalls();
        this.player.checkCollisionsWithBoxes(this.boxes);
        this.background.draw(this.ctx);
        for(let box of this.boxes) {
            box.draw(this.ctx);
        }
        this.player.draw(this.ctx);
    }
}