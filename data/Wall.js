export const walls = [
    { x: 0, y: 0, width: 256, height: 32 },
    { x: 0, y: 32, width: 32, height: 224 },
    { x: 224, y: 32, width: 32, height: 224 },
    { x: 32, y: 224, width: 192, height: 32 },
    { x: 96, y: 96, width: 32, height: 32},
    // { x: 96, y: 96, width: 64, height: 64 },

    // add more walls here
  ];

const map = [
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1
  ];

  export const map2d = [];

  for (let i = 0; i < map.length; i+=8) {
      map2d.push(map.slice(i, i+8));
  }


  