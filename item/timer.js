export default class Timer {
  #time
  constructor() {
    this.#time = 3600;
  }

  decreaseTime() {
    if (this.#time > 0) {
      this.#time--;
      document.querySelector('#timer').innerHTML = Math.floor(this.#time / 60);
    }
  }

  checkTime() {
    if (this.#time == 0) {
      return true;
    }
  }
  
    // if (this.timer === 0) {
    //     if () {
    //         gameover 띄우기
    //     }
    // }
  }
