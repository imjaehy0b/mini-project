export default class Timer {
  constructor() {
    this.time = 3600;
  }

  decreaseTimer() {
    if (this.time > 0) {
      this.time--;
      document.querySelector('#timer').innerHTML = Math.floor(this.time / 60);
    }
    // if (this.timer === 0) {
    //     if () {
    //         gameover 띄우기
    //     }
    // }
  }
}
