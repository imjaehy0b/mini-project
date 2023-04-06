import GameCanvas from "./ui/game-canvas.js";

window.onload = function() {
    const gameCanvas = new GameCanvas();
    gameCanvas.run();
}

// html의 파일 등의 로드가 모두 끝나면 함수 내부의 동작 실행 