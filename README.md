# mini-project
Canvas API를 이용한 미니 게임 프로젝트

## 프로젝트 소개
박스를 특정위치로 이동시키는 게임

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

<b>4/2</b>
- background, walls, collision 제거 후
이를 map에서 tile, wall, box 객체들로 배경을 표현하게 함
- px 단위가 아니라 2차원 array의 좌표 단위로 객체를 draw함
- player의 움직임을 px 단위가 아니라 array의 index 단위로 움직이게 함
키를 한 번 누르면 오로지 한 칸만 움직임

<b>4/6</b>
- player position update 후 map에서 player와의 collision detection을 구현하도록 재구조화 
- map에 hole을 추가하고 box가 hole에 들어가면 고정되도록 함 
- player가 space key를 누르면 box를 꺼내는 기능 구현 
- 문제 혹은 힌트를 출력하는 영역인 hint-board 추가 
