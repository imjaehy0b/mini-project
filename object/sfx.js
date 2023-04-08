export default class SFX {
  constructor() {
    this.audio = document.getElementById('inGameAudio');
  }

  play() {
    this.audio.play();
  }
}
