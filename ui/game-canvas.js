/** @type {HTMLCanvasElement} */

import Timer from '../item/timer.js';
import Map from '../item/map.js';
import Player from '../item/player.js';
import HintBoard from '../object/hint-board.js';
import Hint from '../object/hint.js';
import SFX from '../object/sfx.js';

const WIDTH = 768;
const HEIGHT = 512;

export default class GameCanvas {
	#obj
	#ctx
	#currentScreen
	#title
	#levelSelection
	#loading
	#map
	#player
	#hintBoard
	#hint
	#timer
	#sfx
	constructor() {
		this.#obj = document.createElement('canvas');
		this.#obj.tabIndex = 0;
		document.body.append(this.#obj);
		this.#obj.focus();

		this.#obj.width = WIDTH;
		this.#obj.height = HEIGHT;

		this.#ctx = this.#obj.getContext('2d');

		this.#currentScreen = 'titleScreen';
		this.#title = document.getElementById('titleScreen');
		this.#levelSelection = document.getElementById('levelSelectionScreen');
		this.#loading = document.getElementById('loadingScreen');

		this.#map = new Map();
		this.#player = new Player();
		this.#hintBoard = new HintBoard();
		this.#hint = new Hint();
		this.#timer = new Timer();
		// this.#sfx = new SFX();

		this.#obj.onmousedown = this.mouseDownHandler.bind(this);
		this.#obj.onkeydown = this.keyDownHandler.bind(this);
		this.#obj.onkeyup = this.keyUpHandler.bind(this);
	}

	drawTitleScreen() {
		let titleImg = this.#title;
		let width = this.#obj.width;
		let height = this.#obj.height;
		this.#ctx.drawImage(titleImg, 0, 0, width, height);
	}

	drawLevelSelectionScreen() {
		let img = this.#levelSelection;
		let width = this.#obj.width;
		let height = this.#obj.height;

		this.#ctx.clearRect(0, 0, width, height);
		this.#ctx.drawImage(img, 0, 0, width, height);
	}

	mouseDownHandler(e) {
		switch (this.#currentScreen) {
			case 'titleScreen': 
				if (290 <= e.offsetX && e.offsetX <= 475 
					&& 300 <= e.offsetY && e.offsetY <= 335) {
						this.#currentScreen = 'levelSelectionScreen';
						setTimeout(() => {
							this.drawLevelSelectionScreen();
						}, 700);
						this.#ctx.drawImage(this.#loading, 0, 0, this.#obj.width, this.#obj.height);
					}
					break;

			case 'levelSelectionScreen': 
				if (120 <= e.offsetX && 
					  e.offsetX <= 210 && 
						195 <= e.offsetY && 
						e.offsetY <= 250) {
						this.#currentScreen = 'runScreen';
						setTimeout(() => {
							this.run();
						}, 700)
						this.#ctx.drawImage(this.#loading, 0, 0, this.#obj.width, this.#obj.height);
					}
				break;
		}
	}

	keyDownHandler(e) {
		// player의 상하좌우 움직임과 hole에 빠진 box를 꺼내는 동작 구현 
		switch (e.key) {
			case "r":
				document.location.reload();
				break;
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
				if (existBoxInHoleDirection.upperSide &&
					!existObstacleDirection.underSide
				) {
					this.#map.takeOutBoxFromHole('up', x, y);
					this.#player.move('down');
				} else if (
					existBoxInHoleDirection.underSide &&
					!existObstacleDirection.upperSide
				) {
					this.#map.takeOutBoxFromHole('down', x, y);
					this.#player.move('up');
				} else if (
					existBoxInHoleDirection.leftSide &&
					!existObstacleDirection.rightSide
				) {
					this.#map.takeOutBoxFromHole('left', x, y);
					this.#player.move('right');
				} else if (
					existBoxInHoleDirection.rightSide &&
					!existObstacleDirection.leftSide
				) {
					this.#map.takeOutBoxFromHole('right', x, y);
					this.#player.move('left');
				}

				break;
		}
	}

	keyUpHandler() {
		// player의 direction을 전부 초기화하고 0으로 초기화 됐던 step을 1로 만들어 다시 player가 움직일 수 있게 함
		this.#player.resetDirection();
		this.#player.setStep();
	}

	update() {
		// player의 위치 update 후 map에 존재하는 객체들과 충돌 검사
		// 이후 정답 검사
		this.#timer.decreaseTime();
		// this.#sfx.play();
		this.#player.update();
		this.#map.detectCollisionWith(this.#player);
	}

	paint() {
		this.#map.draw(this.#ctx);
		this.#player.draw(this.#ctx);
		this.#hintBoard.draw(this.#ctx);
		this.#hint.draw(this.#ctx);
	}

	checkClear() {
		let allCorrect = this.#map.checkAnswer();
		if (allCorrect) {
			return true;
		}
	}

	checkTimeOut() {
		let isZero = this.#timer.checkTime();
		if (isZero)
			return true;
	}

	showTimeOutMessage() {
		const centerX = this.#obj.width / 2;
		const centerY = this.#obj.height / 2;
	
		this.#ctx.fillStyle = "white";
		this.#ctx.font = "96px Arial";
		this.#ctx.textAlign = "center";
		this.#ctx.fillText("Time Out!", centerX, centerY);
	}

	showClearMessage() {
		const centerX = this.#obj.width / 2;
		const centerY = this.#obj.height / 2;
	
		this.#ctx.fillStyle = "black";
		this.#ctx.font = "96px Arial";
		this.#ctx.textAlign = "center";
		this.#ctx.fillText("Clear!", centerX, centerY);
	}

	run() {
		this.#ctx.clearRect(0, 0, this.#obj.width, this.#obj.height);
		this.update();
		this.paint();

		let isClear = this.checkClear();
		let isTimeOut = this.checkTimeOut();

		if (isClear) {
			this.showClearMessage();
			this.#currentScreen = 'levelSelectionScreen';
			
			this.drawLevelSelectionScreen();
			return;
		}

		if (isTimeOut) {
			this.showTimeOutMessage();
			return;
		}
		requestAnimationFrame(this.run.bind(this));
		// requestAnimationFrame이 블록 최상단에 있을 때랑 최하단에 있을 때 차이 발생
		// 최상단에 있을 때는 return의 영향을 받지 않고 123이 계속 출력 되고
		// 최하단에 있을 때는 생각한 대로 123이 한 번만 출력 되고 동작 종료
	}
}
