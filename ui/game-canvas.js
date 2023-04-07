/** @type {HTMLCanvasElement} */

import Map from "../item/map.js";
import Player from "../item/player.js";
import HintBoard from "../object/hint-board.js";
import Hint from "../object/hint.js";

export default 
class GameCanvas {
    #obj
    #ctx
    #map
    #player
    #hintBoard
    #hint
    constructor() {
        this.#obj = document.createElement("canvas");
        this.#obj.tabIndex = 0;
        document.body.append(this.#obj);
        this.#obj.focus();

        this.#obj.width = 768;
        this.#obj.height = 512;

        this.#ctx = this.#obj.getContext("2d");

        this.#map = new Map();
        this.#player = new Player();
        this.#hintBoard = new HintBoard();
        this.#hint = new Hint();

        this.#obj.onkeydown = this.keyDownHandler.bind(this);
        this.#obj.onkeyup = this.keyUpHandler.bind(this);
    }

    keyDownHandler(e) {
        switch (e.key) {
            case "w":
                this.#player.move("up");
                break;
            case "s":
                this.#player.move("down");
                break;
            case "a":
                this.#player.move("left");
                break;
            case "d":
                this.#player.move("right");
                break;
            case " ":
                let existHoleDirection = this.#map.checkBoxInHoleAround(this.#player);
                let existObstacleDirection = this.#map.checkObstacles(this.#player);
                let playerInHole = this.#map.checkPlayerInHole(this.#player);

                if (playerInHole) {
                    return;
                }
                if (existHoleDirection.upperSide && !existObstacleDirection.underSide) {
                    this.#map.takeOutBoxFromHole("up", this.#player);
                    this.#player.move("down");
                } else if (existHoleDirection.underSide && !existObstacleDirection.upperSide) {
                    this.#map.takeOutBoxFromHole("down", this.#player);
                    this.#player.move("up");
                } else if (existHoleDirection.leftSide && !existObstacleDirection.rightSide) {
                    this.#map.takeOutBoxFromHole("left", this.#player);
                    this.#player.move("right");
                } else if (existHoleDirection.rightSide && !existObstacleDirection.leftSide) {
                    this.#map.takeOutBoxFromHole("right", this.#player);
                    this.#player.move("left");
                }
                
                break;
        }
    }

    keyUpHandler() {
        this.#player.resetDirection();
        this.#player.setVelocity();
    }

    paint() {
        this.#map.draw(this.#ctx);
        this.#player.draw(this.#ctx);
        this.#hintBoard.draw(this.#ctx);
        this.#hint.draw(this.#ctx);
    }

    update() {
        this.#player.update();   
        this.#map.checkCollisionWith(this.#player);
    }

    run() {
        requestAnimationFrame(this.run.bind(this));
        
        this.update();
        this.paint();
    }
}