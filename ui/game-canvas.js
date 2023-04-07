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
        // player의 상하좌우 움직임과 hole에 빠진 box를 꺼내는 동작 구현 
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
                let existBoxInHoleDirection = this.#map.checkBoxInHoleAround(this.#player);
                let existObstacleDirection = this.#map.checkObstaclesAround(this.#player);
                let playerInHole = this.#map.isInHole(this.#player);

                // player의 현재 위치가 hole이면 종료 
                if (playerInHole) {
                    return;
                }

                // player의 근처에 hole에 들어간 box가 존재하고 반대 방향에 obstacle(wall, box)이 없을 때 
                // box를 hole에서 꺼내는 동작 수행 
                let x = this.#player.x;
                let y = this.#player.y;
                if (existBoxInHoleDirection.upperSide && !existObstacleDirection.underSide) {
                    this.#map.takeOutBoxFromHole("up", x, y);
                    this.#player.move("down");
                } else if (existBoxInHoleDirection.underSide && !existObstacleDirection.upperSide) {
                    this.#map.takeOutBoxFromHole("down", x, y);
                    this.#player.move("up");
                } else if (existBoxInHoleDirection.leftSide && !existObstacleDirection.rightSide) {
                    this.#map.takeOutBoxFromHole("left", x, y);
                    this.#player.move("right");
                } else if (existBoxInHoleDirection.rightSide && !existObstacleDirection.leftSide) {
                    this.#map.takeOutBoxFromHole("right", x, y);
                    this.#player.move("left");
                }
                
                break;
        }
    }

    keyUpHandler() {
        // player의 direction을 전부 초기화하고 0으로 초기화 됐던 step을 1로 만들어 다시 player가 움직일 수 있게 함 
        this.#player.resetDirection();
        this.#player.setStep();
    }

    paint() {
        this.#map.draw(this.#ctx);
        this.#player.draw(this.#ctx);
        this.#hintBoard.draw(this.#ctx);
        this.#hint.draw(this.#ctx);
    }

    update() {
        // player의 위치 update 후 map에 존재하는 객체들과 충돌 검사 
        this.#player.update();   
        this.#map.checkCollisionWith(this.#player);
    }

    run() {
        requestAnimationFrame(this.run.bind(this));
        
        this.update();
        this.paint();
    }
}