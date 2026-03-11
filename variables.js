const particleTypes = [
  //? alpha
  {
    mass: 6.644e-27,
    charge: -3.204e-19,
    velocity: 1.5e8,
  },
  //? beta-
  {
    mass: 9.109e-31,
    charge: -1.602e-19,
    velocity: 2.9e8,
  },
  //? beta+
  {
    mass: 9.109e-31,
    charge: 1.602e-19,
    velocity: 2.9e8,
  },
  //? gamma
  {
    mass: 0,
    charge: 0,
    velocity: 3e8,
  },
];

const magnetPower = 50e-3;

const multiplier = window.innerWidth / 31;

const customBlack = "#212121";

const delta_t = 3e-12;
