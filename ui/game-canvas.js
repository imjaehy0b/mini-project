/** @type {HTMLCanvasElement} */

// import Timer from '../item/timer.js';
import Map from '../item/map.js';
import Player from '../item/player.js';
import StartBtn from '../start/startBtn.js';
import SFX from '../object/sfx.js';
import SelectBackground from '../select/selectBackground.js';
import LevelButton from '../select/levelButton.js';
import BackGround from '../start/background.js';
import GotoStage from '../select/gotoStage.js';
import Layer from '../story/layer.js';
import Ending from '../ending/ending.js';
const WIDTH = 1024;
const HEIGHT = 640;

export default class GameCanvas {
	#obj
	#ctx
	#currentScreen
	#levelSelection
	#loading
	#map
	#player
	// #timer
	#sfx
	#layer
	#reset
	#stageIndex
	#clearStage
	#btn
	#startBtn
	#selectBackground
	#levelButton
	#background
	#gotoStage
	#ending
	constructor() {
		this.#obj = document.createElement('canvas');
		this.#obj.tabIndex = 0;
		document.body.append(this.#obj);
		this.#obj.focus();

		this.#obj.width = WIDTH;
		this.#obj.height = HEIGHT;

		this.#ctx = this.#obj.getContext('2d');

		this.#currentScreen = 'titleScreen';

		this.#levelSelection = document.getElementById('levelSelectionScreen');
		this.#loading = document.getElementById('loadingScreen');

		this.#sfx = new SFX();
		this.#background = new BackGround()
		this.#startBtn = new StartBtn();
		this.#layer = new Layer();
		this.#reset = false;
		this.#btn = true

		this.#stageIndex = 0;
		this.#clearStage = [false, false, false];
		this.#map = new Map(this.#stageIndex);

		this.#player = new Player(this.#stageIndex);
		// this.#timer = new Timer();
		this.#selectBackground = new SelectBackground();
		this.#levelButton = new LevelButton();
		this.#gotoStage = new GotoStage();
		this.#ending = new Ending();
		// this.#obj.onmousedown = this.mouseDownHandler.bind(this);

		this.#obj.addEventListener('click', this.mouseClick.bind(this));
		this.#obj.addEventListener('mousemove', this.mouseMove.bind(this));

		this.#obj.onkeydown = this.keyDownHandler.bind(this);
		this.#obj.onkeyup = this.keyUpHandler.bind(this);
	}

	drawTitleScreen() {
		if (this.#btn) {
			requestAnimationFrame(this.drawTitleScreen.bind(this));
			this.#background.draw(this.#ctx)//기본배경
			this.#background.update(this.#ctx)
			this.#startBtn.draw(this.#ctx)
			this.#sfx.playTitle();
		}
	}

	drawStroyScreen() {
		if (this.#layer.bol) {
			requestAnimationFrame(this.drawStroyScreen.bind(this));
			this.#layer.update()
			this.#layer.draw(this.#ctx)
		}
		if (!this.#layer.bol) {
			this.#currentScreen = 'levelSelectionScreen'
		}
	}

	drawEndingScreen() {
		// requestAnimationFrame(this.drawEndingScreen.bind(this));
        // if (this.#btn) {
			this.#ending.draw(this.#ctx);
			this.#ending.update();
        // }
        // console.log("testEnding");
    }

	drawLevelSelectionScreen() {
	
		if (this.#btn) {
			requestAnimationFrame(this.drawLevelSelectionScreen.bind(this));
			this.#sfx.playSelection();
			this.#selectBackground.draw(this.#ctx)//기본배경
			this.#levelButton.draw(this.#ctx)
		}

		// this.#ctx.drawImage(this.#loading, 0, 0, this.#obj.width, this.#obj.height);
		// if (this.#btn) {
		// 	requestAnimationFrame(this.drawLevelSelectionScreen.bind(this));
		// 	this.#sfx.playSelection();
		// 	this.#selectBackground.draw(this.#ctx)//기본배경
		// 	this.#levelButton.draw(this.#ctx)
		// }

		// let img = this.#levelSelection;
		// let width = this.#obj.width;
		// let height = this.#obj.height;

		// this.#ctx.clearRect(0, 0, width, height);
		// this.#ctx.drawImage(img, 0, 0, width, height);
	}

	mouseMove(e) {
		this.#startBtn.buttonHover(e);
		this.#levelButton.buttonHover(e)
	}

	mouseClick(e) {
		console.log(e.offsetX, e.offsetY)
		switch (this.#currentScreen) {
			case 'titleScreen':
				if (400 <= e.offsetX && e.offsetX <= 650
					&& 520 <= e.offsetY && e.offsetY <= 620) {
					this.#currentScreen = 'levelSelectionScreen';
					this.drawStroyScreen();
					// this.drawEndingScreen();
					setTimeout(() => {
						this.#btn = true;
						this.#sfx.pauseTitle();
						this.drawLevelSelectionScreen();
					}, 19000);
					this.#btn = false
					this.#ctx.drawImage(this.#loading, 0, 0, this.#obj.width, this.#obj.height);
				}
				break;

			case 'levelSelectionScreen':
				if (
					110 <= e.offsetX &&
					e.offsetX <= 310 &&
					280 <= e.offsetY &&
					e.offsetY <= 380
				) {
					this.#currentScreen = 'runScreen';
					this.#stageIndex = 0;
					this.#clearStage[this.#stageIndex] = false;
					this.#map = new Map(this.#stageIndex);
					this.#player = new Player(this.#stageIndex);
					// this.#timer = new Timer();
					setTimeout(() => {
						this.#sfx.pauseSelection();
						this.#obj.width = 576;
						this.#obj.height = 384;
						this.run();
					}, 700)
					this.#btn = false;
					this.#sfx.pauseSelection();
					this.#ctx.drawImage(this.#loading, 0, 0, this.#obj.width, this.#obj.height);
				}
				else if (
					415 <= e.offsetX &&
					e.offsetX <= 615 &&
					280 <= e.offsetY &&
					e.offsetY <= 380
				) {
					this.#currentScreen = 'runScreen';
					this.#stageIndex = 1;
					this.#clearStage[this.#stageIndex] = false;
					this.#map = new Map(this.#stageIndex);
					this.#player = new Player(this.#stageIndex);
					// this.#timer = new Timer();
					setTimeout(() => {
						this.#sfx.pauseSelection();

						this.#obj.width = 640;
						this.#obj.height = 512;
						this.run();
					}, 700)
					this.#btn = false;
					this.#ctx.drawImage(this.#loading, 0, 0, this.#obj.width, this.#obj.height);
				}
				else if (
					710 <= e.offsetX &&
					e.offsetX <= 910 &&
					280 <= e.offsetY &&
					e.offsetY <= 380
				) {
					this.#currentScreen = 'runScreen';
					this.#stageIndex = 2;
					this.#clearStage[this.#stageIndex] = false;
					this.#map = new Map(this.#stageIndex);
					this.#player = new Player(this.#stageIndex);
					// this.#timer = new Timer();
					setTimeout(() => {
						this.#sfx.pauseSelection();

						this.#obj.width = 448;
						this.#obj.height = 448;
						this.run();
					}, 700)
					this.#btn = false;
					this.#ctx.drawImage(this.#loading, 0, 0, this.#obj.width, this.#obj.height);
				}
				break;
			case 'runScreen':
				if (3 <= e.offsetX && e.offsetX <= 60 &&
					3 <= e.offsetY && e.offsetY <= 60) {
					this.#currentScreen = 'levelSelectionScreen';
					setTimeout(() => {
						this.#btn = true;
						this.#obj.width = WIDTH;
						this.#obj.height = HEIGHT;
						this.drawLevelSelectionScreen();
					}, 1000);
					this.#sfx.pauseStage();
					this.#btn = false
					this.#ctx.drawImage(this.#loading, 0, 0, this.#obj.width, this.#obj.height);
				}
		}
	}

	keyDownHandler(e) {
		// player의 상하좌우 움직임과 hole에 빠진 box를 꺼내는 동작 구현 
		switch (e.key) {
			// reset 버튼 구현 미완 
			case "r":
				this.#reset = true;
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
		// this.#timer.decreaseTime();
		// this.#sfx.play();
		this.#player.update();
		this.#map.detectCollisionWith(this.#player);
	}

	paint() {
		this.#map.draw(this.#ctx);
		this.#gotoStage.draw(this.#ctx);
		// this.#timer.draw(this.#ctx);
		this.#player.draw(this.#ctx);
	}

	checkClear() {
		let allCorrect = this.#map.checkAnswer();
		if (allCorrect) {
			return true;
		}
	}

	// checkTimeOut() {
	// 	// let isZero = this.#timer.checkTime();
	// 	if (isZero)
	// 		return true;
	// }

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
		this.#sfx.playStage();
		this.update();
		this.paint();

		let isClear = this.checkClear();
		// let isTimeOut = this.checkTimeOut();

		if (this.#reset) {
			this.#reset = false;

			this.#map = new Map(this.#stageIndex);
			this.#player = new Player(this.#stageIndex);
			// this.#timer = new Timer(this.#stageIndex);
		}

		if (isClear && this.#stageIndex == 2) {
			this.#clearStage[this.#stageIndex] = true;
			console.log(this.#clearStage);
			if (this.#clearStage[0] && this.#clearStage[1] && this.#clearStage[2]) {
				this.#map.openWormHole();
				if (this.#player.x == 6 && this.#player.y == 3) {
					this.#sfx.pauseStage();
					this.#sfx.playEnding();
					this.#currentScreen = 'levelSelectionScreen';
					this.#obj.width = WIDTH;
					this.#obj.height = HEIGHT;
					this.#btn = true;
					this.drawEndingScreen();
				}
			} else {
				this.showClearMessage();
				this.#currentScreen = 'levelSelectionScreen';
				this.#obj.width = WIDTH;
				this.#obj.height = HEIGHT;
				this.#btn = true;
				this.drawLevelSelectionScreen();
			}
		} else if (isClear) {
			this.#clearStage[this.#stageIndex] = true;
			console.log(this.#clearStage);
			this.showClearMessage();
			this.#currentScreen = 'levelSelectionScreen';
			this.#obj.width = WIDTH;
			this.#obj.height = HEIGHT;
			this.#btn = true;
			setTimeout(() => {
				this.#btn = true;
				this.#sfx.pauseTitle();
				this.drawLevelSelectionScreen();
			}, 1000);
			this.#btn = false
			this.#ctx.drawImage(this.#loading, 0, 0, this.#obj.width, this.#obj.height);
			return;
		}

		// if (isTimeOut) {
		// 	this.showTimeOutMessage();
		// 	return;
		// }

		requestAnimationFrame(this.run.bind(this));
		// requestAnimationFrame이 블록 최상단에 있을 때랑 최하단에 있을 때 차이 발생
		// 최상단에 있을 때는 return의 영향을 받지 않고 123이 계속 출력 되고
		// 최하단에 있을 때는 생각한 대로 123이 한 번만 출력 되고 동작 종료
	}
}
