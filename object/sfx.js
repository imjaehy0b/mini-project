export default class SFX {
    #stageBGM
    #levelBGM
    #titleBGM
    #endingBGM
    constructor() {
      this.#titleBGM = document.getElementById('titleBGM');
      this.#levelBGM = document.getElementById('levelBGM');
      this.#stageBGM = document.getElementById('stageBGM');
      this.#endingBGM = document.getElementById('endingBGM');
    }
  
    playTitle(){
      this.#titleBGM.play()
    }
  
    pauseTitle(){
      this.#titleBGM.pause()
    }
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    playSelection(){
      this.#levelBGM.play()
    }
  
    pauseSelection(){
      this.#levelBGM.pause()
    }
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    playStage() {
      this.#stageBGM.play();
    }
    pauseStage(){
      this.#stageBGM.pause()
    }
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

    playEnding(){
      this.#endingBGM.play()
    }
  
    pauseEnding(){
      this.#endingBGM.pause()
    }
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  }
  
