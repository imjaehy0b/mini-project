# mini-project
Canvas API를 이용한 미니 게임 프로젝트

## 프로젝트 소개
박스 이동으로 단어를 매칭하는 개발 용어 학습게임

## 개발 기간
- 2023.03.22 ~ 2023.04.07

## 멤버 구성
- 장우전 
- 임재협 
- 윤원빈 

## 일정
<b>3/27</b> 
- 미니 프로젝트 최종 기획 

<b>3/28</b> 
- uml 설계 
- 이미지 리소스 생성
- class 생성
- background, player canvas에 생성

<b>3/29</b>
- player 움직임 구현
- 벽 혹은 물체와의 collision detection 구현 

<b>3/30</b>
- 작성한 프로젝트 코드를 객체지향적으로 구조화 
- canvas에 addEventListener 메서드가 없어 아래 구문 추가로 문제 해결 
  this.canvas.setAttribute("tabindex", "0");
  this.canvas.focus();
- Box.js에 Box class 구현 및 canvas에 그리기 (collision detection 구현)
